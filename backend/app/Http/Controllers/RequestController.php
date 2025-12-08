<?php

namespace App\Http\Controllers;

use App\Models\Request as UserRequest; // Alias untuk menghindari konflik nama
use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RequestController extends Controller
{
    private $documentDisk = 'local'; // Ubah ke private storage
    private $basePath = 'requests'; // storage/app/requests/

    /**
     * Menampilkan daftar pengajuan user (Warga).
     * Endpoint: GET /api/requests
     */
    public function indexAll(Request $request)
    {
        // Pastikan role admin/operator (opsional, kalau ada role)
        // if ($request->user()->role !== 'admin') {
        //     return response()->json(['message' => 'Unauthorized'], 403);
        // }

        // Ambil semua request dengan relasi lengkap
        $requests = UserRequest::with([
                'user:id,full_name',
                'service:id,name',
                'documents'
            ])
            ->latest()
            ->get();

        return response()->json([
            'requests' => $requests
        ]);
    }
    
    public function index(Request $request)
    {
        // Pastikan user terautentikasi (dilakukan di middleware sanctum, tapi baik untuk verifikasi)
        $userId = $request->user()->id;

        $requests = UserRequest::where('user_id', $userId)
            ->with(['user:id,full_name', 'service', 'documents', 'outputs'])
            ->latest()
            ->get();

        return response()->json(['requests' => $requests]);
    }

    /**
     * Menyimpan pengajuan baru dari warga (Create).
     * Endpoint: POST /api/requests
     * Menerima FormData dengan file upload dinamis.
     */
    public function store(Request $request)
    {
        // 1. Validasi Data Dasar
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'service_id' => 'required|exists:services,id',
            'request_type' => 'required|string|max:150',
            'subject' => 'required|string|max:255',
            'description' => 'required|string',
            'document_mapping' => 'required|json', // Mapping: "Nama Persyaratan:document_0"
            // File validation di sini bersifat opsional karena nama file dinamis,
            // tetapi kita bisa memvalidasi saat memproses file.
        ]);

        // 2. Dekode Mapping Dokumen
        $documentMapping = json_decode($validatedData['document_mapping'], true);
        
        // 3. Verifikasi Keberadaan File dan Format Mapping
        $documentData = [];
        $fileKeyIndex = 0;
        
        foreach ($documentMapping as $map) {
            // Memastikan format mapping benar (Nama Persyaratan:file_key)
            if (strpos($map, ':') === false) {
                 return response()->json(['message' => 'Format document_mapping tidak valid.'], 422);
            }
            
            list($requiredName, $fileKey) = explode(':', $map, 2);
            
            // Verifikasi file yang dikirim oleh frontend
            if (!$request->hasFile($fileKey) || !$request->file($fileKey)->isValid()) {
                // Seharusnya form di frontend mencegah ini, tapi ini adalah safety check
                return response()->json(['message' => "File untuk persyaratan '{$requiredName}' tidak ditemukan atau tidak valid."], 422);
            }
            
            // Simpan data untuk diproses di transaction
            $documentData[] = [
                'required_name' => $requiredName,
                'file_key' => $fileKey,
                'file' => $request->file($fileKey),
            ];
            $fileKeyIndex++;
        }
        
        return DB::transaction(function () use ($request, $validatedData, $documentData) {
            
            // 4. Buat Record Pengajuan Utama
            $requestRecord = UserRequest::create([
                'user_id' => $validatedData['user_id'],
                'service_id' => $validatedData['service_id'],
                'request_type' => $validatedData['request_type'],
                'subject' => $validatedData['subject'],
                'description' => $validatedData['description'],
                'status' => 'pending', // Status awal
            ]);

            $newDocuments = [];
            $requestPath = $this->basePath . '/' . $requestRecord->id; // e.g., requests/1/

            // 5. Proses dan Simpan Setiap File
            foreach ($documentData as $doc) {
                $requiredName = $doc['required_name'];
                $file = $doc['file'];

                // Sanitasi nama file untuk storage
                $safeFileName = strtolower(str_replace([' ', '/', '\\'], '_', $requiredName)) . '.' . $file->extension();

                // Simpan file ke storage per ID pengajuan
                // Path akan menjadi: storage/app/public/requests/{id}/[safe_filename]
                $filePath = $file->storeAs(
                    $requestPath, 
                    $safeFileName,
                    $this->documentDisk
                );

                $newDocuments[] = [
                    'required_name' => $requiredName,
                    'file_path' => $filePath, // Path relatif yang tersimpan di DB
                    'original_name' => $file->getClientOriginalName(),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            
            // 6. Simpan Record Dokumen
            $requestRecord->documents()->createMany($newDocuments);

            // Muat ulang relasi untuk response
            return response()->json([
                'message' => 'Pengajuan berhasil dikirim.', 
                'request' => $requestRecord->load('documents', 'service')
            ], 201);
        });
    }

    /**
     * Update status pengajuan menjadi in_progress.
     * Endpoint: PUT /api/requests/{id}/status
     */
    public function updateStatus($id)
    {
        $request = UserRequest::findOrFail($id);

        // Hanya update jika status masih pending
        if ($request->status === 'pending') {
            $request->update(['status' => 'in_progress']);
        }

        return response()->json([
            'message' => 'Status berhasil diupdate',
            'request' => $request->load(['user:id,full_name', 'service', 'documents', 'outputs'])
        ]);
    }

    /**
     * Approve pengajuan dengan upload file output dan catatan.
     * Endpoint: POST /api/requests/{id}/approve
     */
    public function approve(Request $httpRequest, $id)
    {
        $request = UserRequest::findOrFail($id);

        $validatedData = $httpRequest->validate([
            'response' => 'required|string',
            'output_file' => 'required|file|mimes:pdf,doc,docx|max:10240', // Max 10MB
        ]);

        return DB::transaction(function () use ($request, $httpRequest, $validatedData) {
            // Update status dan response
            $request->update([
                'status' => 'approved',
                'response' => $validatedData['response'],
            ]);

            // Upload file ke private storage
            $file = $httpRequest->file('output_file');
            $serviceName = $request->service ? str_replace([' ', '/', '\\'], '_', $request->service->name) : 'layanan';
            $privatePath = 'layanan/' . $serviceName;

            // Simpan file dengan nama original
            $fileName = $file->getClientOriginalName();

            \Log::info('Attempting to store file', [
                'file_name' => $fileName,
                'path' => $privatePath,
                'disk' => 'local',
                'file_size' => $file->getSize()
            ]);

            $filePath = $file->storeAs($privatePath, $fileName, 'local'); // Gunakan disk 'local' untuk private

            \Log::info('File stored', [
                'file_path' => $filePath,
                'full_path' => storage_path('app/' . $filePath),
                'exists' => Storage::disk('local')->exists($filePath)
            ]);

            // Simpan record output
            $output = $request->outputs()->create([
                'file_name' => $fileName,
                'file_path' => $filePath,
            ]);

            \Log::info('Output record created', [
                'output_id' => $output->id,
                'file_path' => $output->file_path
            ]);

            return response()->json([
                'message' => 'Pengajuan berhasil disetujui',
                'request' => $request->load(['user:id,full_name', 'service', 'documents', 'outputs'])
            ]);
        });
    }

    /**
     * Verify pengajuan dengan catatan, tanpa upload file.
     * Endpoint: POST /api/requests/{id}/verify
     */
    public function verify(Request $httpRequest, $id)
    {
        $request = UserRequest::findOrFail($id);

        $validatedData = $httpRequest->validate([
            'response' => 'nullable|string',
        ]);

        $request->update([
            'status' => 'operator_verified',
            'response' => $validatedData['response'],
        ]);

        return response()->json([
            'message' => 'Pengajuan berhasil diverifikasi',
            'request' => $request->load(['user:id,full_name', 'service', 'documents', 'outputs'])
        ]);
    }

    /**
     * Reject pengajuan dengan catatan.
     * Endpoint: POST /api/requests/{id}/reject
     */
    public function reject(Request $httpRequest, $id)
    {
        $request = UserRequest::findOrFail($id);

        $validatedData = $httpRequest->validate([
            'response' => 'required|string',
        ]);

        $request->update([
            'status' => 'rejected',
            'response' => $validatedData['response'],
        ]);

        return response()->json([
            'message' => 'Pengajuan berhasil ditolak',
            'request' => $request->load(['user:id,full_name', 'service', 'documents', 'outputs'])
        ]);
    }

    /**
     * Download dokumen persyaratan dari private storage.
     * Endpoint: GET /api/requests/document/{id}/download
     * Hanya operator/admin yang bisa download dokumen persyaratan.
     */
    public function downloadDocument(Request $httpRequest, $documentId)
    {
        try {
            // Support token dari query parameter untuk download
            $token = $httpRequest->query('token') ?? $httpRequest->bearerToken();

            if (!$token) {
                return response()->json(['message' => 'Token tidak ditemukan'], 401);
            }

            // Manually authenticate user dengan token
            $personalAccessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);

            if (!$personalAccessToken) {
                return response()->json(['message' => 'Token tidak valid'], 401);
            }

            $user = $personalAccessToken->tokenable;

            // Validasi: Hanya operator/admin yang bisa download
            if (!in_array($user->role, ['operator', 'admin'])) {
                return response()->json(['message' => 'Unauthorized - Only operator/admin can download'], 403);
            }

            $document = \App\Models\RequestDocument::findOrFail($documentId);

            // Ambil raw path dari database (tanpa accessor yang convert ke URL)
            $rawPath = $document->getRawOriginal('file_path');

            // Jika raw path adalah URL, extract path relatifnya
            if (filter_var($rawPath, FILTER_VALIDATE_URL)) {
                // Parse URL untuk ambil path: http://127.0.0.1:8000/storage/requests/5/ktp.pdf -> requests/5/ktp.pdf
                $parsedUrl = parse_url($rawPath);
                $urlPath = $parsedUrl['path'] ?? '';
                // Remove '/storage/' prefix
                $rawPath = str_replace('/storage/', '', $urlPath);
            }

            // Cek apakah file exists di private storage
            if (!Storage::disk('local')->exists($rawPath)) {
                \Log::error('File not found in storage', [
                    'raw_path' => $rawPath,
                    'full_path' => Storage::disk('local')->path($rawPath),
                    'exists' => Storage::disk('local')->exists($rawPath)
                ]);
                return response()->json(['message' => 'File tidak ditemukan'], 404);
            }

            // Get file path dan mime type
            $filePath = Storage::disk('local')->path($rawPath);
            $extension = pathinfo($document->original_name, PATHINFO_EXTENSION);

            // Set proper MIME type
            $mimeTypes = [
                'pdf' => 'application/pdf',
                'doc' => 'application/msword',
                'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png' => 'image/png',
            ];

            $mimeType = $mimeTypes[strtolower($extension)] ?? 'application/octet-stream';

            \Log::info('Downloading document', [
                'document_id' => $documentId,
                'file_name' => $document->original_name,
                'file_path' => $filePath,
                'mime_type' => $mimeType,
                'file_exists' => file_exists($filePath),
                'file_size' => file_exists($filePath) ? filesize($filePath) : 0
            ]);

            // Pastikan file exists
            if (!file_exists($filePath)) {
                return response()->json(['message' => 'File tidak ditemukan di server'], 404);
            }

            // Return response dengan stream untuk memastikan binary tidak corrupt
            return response()->stream(function() use ($filePath) {
                $stream = fopen($filePath, 'rb');
                fpassthru($stream);
                fclose($stream);
            }, 200, [
                'Content-Type' => $mimeType,
                'Content-Length' => filesize($filePath),
                'Content-Disposition' => 'attachment; filename="' . $document->original_name . '"',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0',
            ]);

        } catch (\Exception $e) {
            \Log::error('Download document error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Download file output dari private storage.
     * Endpoint: GET /api/requests/output/{id}/download
     * User hanya bisa download file output milik pengajuan mereka sendiri.
     */
    public function downloadOutput(Request $httpRequest, $outputId)
    {
        try {
            // Support token dari query parameter untuk download
            $token = $httpRequest->query('token') ?? $httpRequest->bearerToken();

            if (!$token) {
                return response()->json(['message' => 'Token tidak ditemukan'], 401);
            }

            // Manually authenticate user dengan token
            $personalAccessToken = \Laravel\Sanctum\PersonalAccessToken::findToken($token);

            if (!$personalAccessToken) {
                return response()->json(['message' => 'Token tidak valid'], 401);
            }

            $user = $personalAccessToken->tokenable;

            $output = \App\Models\RequestOutput::findOrFail($outputId);
            $requestRecord = $output->request;

            // Validasi: User hanya bisa download file milik mereka sendiri
            if ($requestRecord->user_id !== $user->id) {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            // Cek apakah file exists di private storage
            if (!Storage::disk('local')->exists($output->file_path)) {
                return response()->json(['message' => 'File tidak ditemukan'], 404);
            }

            // Get file path dan mime type
            $filePath = Storage::disk('local')->path($output->file_path);
            $extension = pathinfo($output->file_name, PATHINFO_EXTENSION);

            // Set proper MIME type
            $mimeTypes = [
                'pdf' => 'application/pdf',
                'doc' => 'application/msword',
                'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            ];

            $mimeType = $mimeTypes[strtolower($extension)] ?? 'application/octet-stream';

            \Log::info('Downloading file', [
                'output_id' => $outputId,
                'file_name' => $output->file_name,
                'file_path' => $filePath,
                'mime_type' => $mimeType,
                'file_exists' => file_exists($filePath),
                'file_size' => file_exists($filePath) ? filesize($filePath) : 0
            ]);

            // Pastikan file exists
            if (!file_exists($filePath)) {
                return response()->json(['message' => 'File tidak ditemukan di server'], 404);
            }

            // Return response dengan stream untuk memastikan binary tidak corrupt
            return response()->stream(function() use ($filePath) {
                $stream = fopen($filePath, 'rb');
                fpassthru($stream);
                fclose($stream);
            }, 200, [
                'Content-Type' => $mimeType,
                'Content-Length' => filesize($filePath),
                'Content-Disposition' => 'attachment; filename="' . $output->file_name . '"',
                'Cache-Control' => 'no-cache, no-store, must-revalidate',
                'Pragma' => 'no-cache',
                'Expires' => '0',
            ]);

        } catch (\Exception $e) {
            \Log::error('Download error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'Terjadi kesalahan: ' . $e->getMessage()], 500);
        }
    }

    // Fungsi lain seperti show, update, delete dapat ditambahkan di sini.

    /**
     * Menampilkan detail satu pengajuan.
     * Endpoint: GET /api/requests/{request}
     */
    public function show(Request $httpRequest, UserRequest $request)
    {
        $user = $httpRequest->user();

        // Authorization: user can view their own request, or operator/kades/admin can view any.
        if ($user->id !== $request->user_id && !in_array($user->role, ['operator', 'kades', 'admin'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($request->load(['user', 'service', 'documents', 'outputs']));
    }
}