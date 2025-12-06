<?php

namespace App\Http\Controllers;

use App\Models\LetterTemplate;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LetterTemplateController extends Controller
{
    private $storageDisk = 'local'; // Disk private untuk menyimpan template
    private $storagePath = 'private/letter-templates'; // Path dalam disk

    /**
     * Mengambil semua template surat untuk sebuah layanan
     */
    public function indexByService(Service $service)
    {
        $templates = $service->letterTemplates()->where('status', 'active')->get();
        return response()->json($templates);
    }

    /**
     * Menyimpan template surat baru
     */
    public function store(Request $request)
    {
        \Log::info('Letter Template Store - Request data:', [
            'service_id' => $request->input('service_id'),
            'name' => $request->input('name'),
            'has_file' => $request->hasFile('file'),
            'file_size' => $request->file('file')?->getSize(),
        ]);

        try {
            $validated = $request->validate([
                'service_id' => 'required|exists:services,id',
                'name' => 'required|string|max:150',
                'description' => 'nullable|string',
                'file' => 'required|file|mimes:doc,docx,pdf,odt|max:10240', // Max 10MB
            ]);

            \Log::info('Letter Template Store - Validation passed');

            $service = Service::findOrFail($validated['service_id']);
            $file = $request->file('file');

            $filePath = $this->storagePath . '/service_' . $service->id;

            // Pastikan direktori ada sebelum menyimpan
            Storage::disk($this->storageDisk)->makeDirectory($filePath);

            // Generate nama file unik dan simpan
            $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
            $storedPath = $file->storeAs($filePath, $fileName, $this->storageDisk);

            \Log::info('Letter Template Store - File stored:', ['storedPath' => $storedPath]);

            // Buat record di database
            $template = LetterTemplate::create([
                'service_id' => $service->id,
                'name' => $validated['name'],
                'file_path' => $storedPath,
                'file_name' => $file->getClientOriginalName(),
                'mime_type' => $file->getMimeType(),
                'file_size' => $file->getSize(),
                'status' => 'active',
                'description' => $validated['description'] ?? null,
            ]);

            \Log::info('Letter Template Store - Template created:', ['template_id' => $template->id]);

            return response()->json([
                'message' => 'Template surat berhasil disimpan',
                'data' => $template,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Letter Template Store - Validation error:', $e->errors());
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            \Log::error('Letter Template Store - Exception:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Gagal menyimpan template surat',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menampilkan detail satu template surat
     */
    public function show(LetterTemplate $letterTemplate)
    {
        return response()->json($letterTemplate);
    }

    /**
     * Mengupdate template surat
     */
    public function update(Request $request, LetterTemplate $letterTemplate)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:150',
            'description' => 'nullable|string',
            'file' => 'nullable|file|mimes:doc,docx,pdf,odt|max:10240',
        ]);

        try {
            // Jika ada file baru, hapus file lama dan upload yang baru
            if ($request->hasFile('file')) {
                // Hapus file lama
                Storage::disk($this->storageDisk)->delete($letterTemplate->file_path);

                $file = $request->file('file');
                $fileName = Str::random(32) . '.' . $file->getClientOriginalExtension();
                $filePath = $this->storagePath . '/service_' . $letterTemplate->service_id;
                $storedPath = $file->storeAs($filePath, $fileName, $this->storageDisk);

                $letterTemplate->update([
                    'name' => $validated['name'],
                    'file_path' => $storedPath,
                    'file_name' => $file->getClientOriginalName(),
                    'mime_type' => $file->getMimeType(),
                    'file_size' => $file->getSize(),
                    'description' => $validated['description'] ?? null,
                ]);
            } else {
                // Hanya update nama dan deskripsi
                $letterTemplate->update([
                    'name' => $validated['name'],
                    'description' => $validated['description'] ?? null,
                ]);
            }

            return response()->json([
                'message' => 'Template surat berhasil diperbarui',
                'data' => $letterTemplate,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal memperbarui template surat',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Menghapus template surat
     */
    public function destroy(LetterTemplate $letterTemplate)
    {
        try {
            // Hapus file dari storage
            Storage::disk($this->storageDisk)->delete($letterTemplate->file_path);

            // Hapus record dari database
            $letterTemplate->delete();

            return response()->json([
                'message' => 'Template surat berhasil dihapus',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menghapus template surat',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Download template surat (private)
     * Endpoint ini hanya bisa diakses oleh authenticated users
     */
    public function download(LetterTemplate $letterTemplate)
    {
        try {
            // Cek apakah file ada
            $fullPath = 'private/' . $letterTemplate->file_path;
            if (!Storage::disk($this->storageDisk)->exists($fullPath)) {
                return response()->json([
                    'message' => 'File tidak ditemukan',
                ], 404);
            }

            // Download file
            return Storage::disk($this->storageDisk)->download(
                $fullPath,
                $letterTemplate->file_name
            );

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengunduh file',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Toggle status template (active/inactive)
     */
    public function toggleStatus(LetterTemplate $letterTemplate)
    {
        try {
            $newStatus = $letterTemplate->status === 'active' ? 'inactive' : 'active';
            $letterTemplate->update(['status' => $newStatus]);

            return response()->json([
                'message' => 'Status template berhasil diubah',
                'data' => $letterTemplate,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal mengubah status template',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Preview template as PDF (first page only)
     */
    public function previewPdf(LetterTemplate $letterTemplate)
    {
        try {
            \Log::info('Preview PDF - Start:', [
                'template_id' => $letterTemplate->id,
                'file_path' => $letterTemplate->file_path,
                'mime_type' => $letterTemplate->mime_type,
            ]);

            $dbPath = starts_with($letterTemplate->file_path, 'private/') 
                ? $letterTemplate->file_path 
                : 'private/' . $letterTemplate->file_path;

            if (!Storage::disk($this->storageDisk)->exists($dbPath)) {
                \Log::error('Preview PDF - File not found:', ['file_path' => $dbPath]);
                return response()->json([
                    'message' => 'File tidak ditemukan di path yang diharapkan.',
                    'checked_path' => $dbPath,
                    'disk' => $this->storageDisk,
                ], 404);
            }

            $sourcePath = Storage::disk($this->storageDisk)->path($dbPath);
            \Log::info('Preview PDF - Full source path:', ['full_path' => $sourcePath]);

            // Jika sudah PDF, langsung return
            if ($letterTemplate->mime_type === 'application/pdf') {
                return response()->file($sourcePath, [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'inline; filename="preview.pdf"'
                ]);
            }
            
            // Prioritaskan konversi via LibreOffice (soffice) jika tersedia
            // Periksa apakah `soffice` dapat dieksekusi
            $sofficePath = 'soffice'; // Asumsi soffice ada di PATH
            // Di Windows, mungkin perlu path lengkap, misal: "C:\Program Files\LibreOffice\program\soffice.exe"
            // `where soffice` di cmd bisa bantu cari.
            $shellOutput = shell_exec(escapeshellcmd("$sofficePath --version"));

            if ($shellOutput && str_contains($shellOutput, 'LibreOffice')) {
                \Log::info('Preview PDF - Using LibreOffice for conversion.');
                $tempPdfDir = storage_path('app/temp_pdf');
                if (!is_dir($tempPdfDir)) {
                    mkdir($tempPdfDir, 0755, true);
                }
                
                $command = escapeshellcmd("$sofficePath --headless --convert-to pdf " . escapeshellarg($sourcePath) . " --outdir " . escapeshellarg($tempPdfDir));
                \Log::info('Executing command: ' . $command);
                
                shell_exec($command);
                
                $outputPdfName = pathinfo($sourcePath, PATHINFO_FILENAME) . '.pdf';
                $outputPdfPath = $tempPdfDir . '/' . $outputPdfName;

                if (file_exists($outputPdfPath)) {
                    \Log::info('Preview PDF - LibreOffice conversion successful.');
                    return response()->file($outputPdfPath, [
                        'Content-Type' => 'application/pdf',
                        'Content-Disposition' => 'inline; filename="preview.pdf"'
                    ])->deleteFileAfterSend(true);
                }
                
                \Log::warning('Preview PDF - LibreOffice conversion failed, falling back to PHPWord.');
            }

            // Fallback ke PHPWord jika LibreOffice tidak ada atau gagal
            \Log::info('Preview PDF - Using PHPWord for conversion.');
            if (strpos($letterTemplate->mime_type, 'word') !== false || strpos($letterTemplate->mime_type, 'document') !== false) {
                $phpWord = \PhpOffice\PhpWord\IOFactory::load($sourcePath);
                
                $tempFile = tempnam(sys_get_temp_dir(), 'preview_');
                $pdfWriter = \PhpOffice\PhpWord\IOFactory::createWriter($phpWord, 'PDF');
                $pdfWriter->save($tempFile);
                
                \Log::info('Preview PDF - PHPWord PDF created:', ['temp_file' => $tempFile]);
                
                return response()->file($tempFile, [
                    'Content-Type' => 'application/pdf',
                    'Content-Disposition' => 'inline; filename="preview.pdf"'
                ])->deleteFileAfterSend(true);
            }

            \Log::warning('Preview PDF - Unsupported mime type for PHPWord:', ['mime_type' => $letterTemplate->mime_type]);
            return response()->json([
                'message' => 'Tipe file tidak didukung untuk preview',
            ], 400);

        } catch (\Exception $e) {
            \Log::error('Letter Template Preview PDF - Exception:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json([
                'message' => 'Gagal membuat preview PDF. Cek log untuk detail.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
