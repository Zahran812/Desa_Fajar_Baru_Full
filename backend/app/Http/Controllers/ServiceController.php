<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class ServiceController extends Controller
{
    private $templateDisk = 'public'; // Disk yang sudah di-link ke public
    private $templatePath = 'template-dokumen'; // Path dalam disk (storage/app/public/template-dokumen)

    /**
     * [PUBLIC] Mengambil daftar layanan yang statusnya ACTIVE.
     * Accessor Model ServiceTemplate akan otomatis memformat file_url.
     */
    public function indexPublic()
    {
        $services = Service::where('status', 'active')->with(['templates', 'category'])->latest()->get();
        return response()->json($services);
    }

    /**
     * [PUBLIC] Mengambil detail layanan yang statusnya ACTIVE.
     */
    public function showPublic(Service $service)
    {
        if ($service->status !== 'active') {
            return response()->json(['message' => 'Layanan tidak ditemukan atau tidak aktif.'], 404);
        }
        
        // Memuat template agar Accessor file_url berjalan saat di-serialize
        return response()->json($service->load(['templates', 'category']));
    }

    /**
     * [ADMIN/AUTH] Mengambil daftar SEMUA layanan (termasuk inactive).
     */
    public function indexAdmin()
    {
        // Accessor Model ServiceTemplate akan otomatis memformat file_url.
        $services = Service::with(['templates', 'category'])->latest()->get();
        return response()->json($services);
    }

    /**
     * Menyimpan layanan baru (Create).
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'required|string',
            'requirements' => 'required|json', 
            'processing_time' => 'required|string|max:100',
            'fee' => 'required|integer|min:0',
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'category_id' => 'required|exists:categories,id',
            'templates_data' => 'nullable|json',
        ]);
        
        $validatedData['requirements'] = json_decode($validatedData['requirements'], true) ?? [];
        $templatesData = json_decode($request->templates_data, true) ?? [];

        if (count(array_filter($validatedData['requirements'], fn($r) => !empty($r))) === 0) {
            return response()->json(['message' => 'Minimal 1 persyaratan harus diisi.'], 422);
        }

        // Cek konsistensi data template dan file upload
        $templateFiles = array_filter($request->all(), fn($key) => str_starts_with($key, 'template_file_'), ARRAY_FILTER_USE_KEY);
        if (count($templateFiles) !== count(array_filter($templatesData, fn($t) => !isset($t['id'])))) {
             // Cek file baru vs data baru
             // Logika ini mungkin terlalu ketat, asumsikan frontend sudah kirim data yang konsisten
             // Jika frontend kirim data lama tanpa file, count templatesData akan lebih besar
             // Kita hapus validasi ketat ini agar update yang tidak menyertakan file tetap bisa dilakukan.
        }

        return DB::transaction(function () use ($request, $validatedData, $templatesData, $templateFiles) {
            
            $service = Service::create(array_merge($validatedData, [
                'requirements' => $validatedData['requirements'],
                'category_id' => $validatedData['category_id']
            ]));
            
            $newTemplates = [];

            // Simpan file templates dan buat data ServiceTemplate
            foreach ($templatesData as $index => $template) {
                // Hanya proses template yang BARU (tidak ada ID)
                if (!isset($template['id'])) {
                    $fileKey = 'template_file_' . $index;
                    
                    if (isset($templateFiles[$fileKey]) && $request->file($fileKey)->isValid()) {
                        $path = $request->file($fileKey)->store($this->templatePath, $this->templateDisk);
                        
                        $newTemplates[] = [
                            'service_id' => $service->id,
                            'name' => $template['name'],
                            'file_url' => $path, 
                        ];
                    }
                }
            }
            
            if (!empty($newTemplates)) {
                $service->templates()->createMany($newTemplates);
            }

            // Memuat ulang relasi agar Accessor file_url berjalan
            return response()->json($service->load(['templates', 'category']), 201);
        });
    }

    /**
     * Memperbarui layanan yang ada (Update).
     */
    public function update(Request $request, Service $service)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'required|string',
            'requirements' => 'required|json',
            'processing_time' => 'required|string|max:100',
            'fee' => 'required|integer|min:0',
            'status' => ['required', Rule::in(['active', 'inactive'])],
            'category_id' => 'required|exists:categories,id',
            'templates_data' => 'nullable|json',
        ]);
        
        $validatedData['requirements'] = json_decode($validatedData['requirements'], true) ?? [];
        $templatesData = json_decode($request->templates_data, true) ?? [];

        if (count(array_filter($validatedData['requirements'], fn($r) => !empty($r))) === 0) {
            return response()->json(['message' => 'Minimal 1 persyaratan harus diisi.'], 422);
        }
        
        $templateFiles = array_filter($request->all(), fn($key) => str_starts_with($key, 'template_file_'), ARRAY_FILTER_USE_KEY);

        return DB::transaction(function () use ($service, $validatedData, $templatesData, $templateFiles, $request) {
            
            // 1. Update data Service
            $service->update(array_merge($validatedData, [
                'requirements' => $validatedData['requirements'],
                'category_id' => $validatedData['category_id']
            ]));
            
            // 2. Sinkronisasi Templates
            $existingTemplates = $service->templates->keyBy('id');
            $templatesToKeep = [];
            
            foreach ($templatesData as $index => $template) {
                if (isset($template['id'])) {
                    // Update template lama yang ID-nya dikirim (hanya update nama)
                    $existing = $existingTemplates->get($template['id']);
                    if ($existing) {
                        $existing->update(['name' => $template['name']]);
                        $templatesToKeep[] = $existing->id;
                    }
                } else {
                    // Template baru: Cek file upload yang sesuai
                    $fileKey = 'template_file_' . $index;
                    
                    if (isset($templateFiles[$fileKey]) && $request->file($fileKey)->isValid()) {
                        $path = $request->file($fileKey)->store($this->templatePath, $this->templateDisk);
                        
                        $newTemplate = $service->templates()->create([
                            'name' => $template['name'],
                            'file_url' => $path, 
                        ]);
                        $templatesToKeep[] = $newTemplate->id;
                    }
                }
            }

            // 3. Hapus template lama yang ID-nya TIDAK dikirimkan lagi
            $service->templates()
                ->whereNotIn('id', $templatesToKeep)
                ->get()
                ->each(function ($template) {
                    // Hapus file di storage sebelum menghapus record
                    Storage::disk($this->templateDisk)->delete($template->file_url);
                    $template->delete();
                });

            // Memuat ulang relasi agar Accessor file_url berjalan
            return response()->json($service->load(['templates', 'category']));
        });
    }

    /**
     * Menghapus layanan (Delete).
     */
    public function destroy(Service $service)
    {
        // Hapus semua file template terkait sebelum record dihapus
        $service->templates->each(function ($template) {
            // Karena $template->file_url di DB masih berupa path relatif, kita bisa langsung menghapusnya
            Storage::disk($this->templateDisk)->delete($template->file_url);
        });

        $service->delete();
        
        return response()->json(null, 204);
    }
    
    // CATATAN: Helper formatTemplateUrls dihapus karena digantikan oleh Accessor Model ServiceTemplate.
}