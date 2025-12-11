<?php

namespace App\Http\Controllers;

use App\Models\LetterTemplate;
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LetterTemplateController extends Controller
{
    private $storageDisk = 'local'; // Disk private untuk menyimpan template (tidak digunakan lagi untuk HTML)
    private $storagePath = 'private/letter-templates'; // Path dalam disk (legacy, dipertahankan untuk kompatibilitas)

    /**
     * Mengambil semua template surat untuk sebuah layanan
     * Untuk mode dinamis saat ini, kita hanya menggunakan satu template aktif per layanan.
     */
    public function indexByService(Service $service)
    {
        $template = $service->letterTemplates()
            ->where('status', 'active')
            ->orderByDesc('id')
            ->first();

        if (!$template) {
            return response()->json([
                'message' => 'Belum ada template aktif untuk layanan ini',
                'data' => null,
            ], 200);
        }

        return response()->json($template);
    }

    /**
     * Menyimpan template surat baru (mode dinamis: kop_html + body_html)
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'service_id' => 'required|exists:services,id',
                'name' => 'required|string|max:150',
                'description' => 'nullable|string',
                'kop_html' => 'required|string',
                'body_html' => 'required|string',
                'status' => 'nullable|string|in:active,inactive',
            ]);

            $service = Service::findOrFail($validated['service_id']);

            $template = LetterTemplate::create([
                'service_id' => $service->id,
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
                'status' => $validated['status'] ?? 'active',
                'kop_html' => $validated['kop_html'],
                'body_html' => $validated['body_html'],
                // Field legacy file_* diisi kosong agar tidak tergantung file upload
                'file_path' => '',
                'file_name' => '',
                'mime_type' => '',
                'file_size' => 0,
            ]);

            return response()->json([
                'message' => 'Template surat berhasil disimpan',
                'data' => $template,
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
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
            'kop_html' => 'nullable|string',
            'body_html' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        try {
            $updateData = [
                'name' => $validated['name'],
                'description' => $validated['description'] ?? null,
            ];

            if (array_key_exists('kop_html', $validated)) {
                $updateData['kop_html'] = $validated['kop_html'];
            }

            if (array_key_exists('body_html', $validated)) {
                $updateData['body_html'] = $validated['body_html'];
            }

            if (array_key_exists('status', $validated)) {
                $updateData['status'] = $validated['status'];
            }

            $letterTemplate->update($updateData);

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
        return response()->json([
            'message' => 'Fitur download file template tidak lagi didukung untuk template HTML dinamis.',
        ], 400);
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
        return response()->json([
            'message' => 'Preview PDF berbasis file tidak lagi didukung. Gunakan alur preview dari LetterController (generate/preview).',
        ], 400);
    }
    public function previewHtml(LetterTemplate $letterTemplate)
    {
        return response()->json([
            'message' => 'Preview HTML berbasis file tidak lagi didukung. Gunakan data kop_html dan body_html secara langsung.',
            'kop_html' => $letterTemplate->kop_html,
            'body_html' => $letterTemplate->body_html,
        ], 200);
    }


}
