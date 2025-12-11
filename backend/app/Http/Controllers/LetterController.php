<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request as HttpRequest;
use App\Models\Request;
use App\Models\RequestOutput;
use App\Models\LetterTemplate;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Str;

class LetterController extends Controller
{
    /**
     * Generate the HTML content of a letter from operator's input and save it to the request.
     */
    public function generate(HttpRequest $httpRequest, Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'operator') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $httpRequest->validate([
            'letter_data' => 'required|array',
            'letter_number' => 'required|string',
        ]);

        $letterData = $validated['letter_data'];
        $letterNumber = $validated['letter_number'];

        // Store the operator's input data
        $request->letter_input_data = $letterData;

        // Siapkan data dasar untuk rendering template
        // Flatten citizen/placeholder data so Blade variables like {{ nama }} tidak error
        $baseData = array_merge(
            [
                'letter_number' => $letterNumber,
                'no_surat' => $letterNumber,
                'nomor_surat' => $letterNumber,
                'nomor' => $letterNumber,
                'request' => $request->toArray(),
                'citizen' => $letterData,
            ],
            $letterData ?? []
        );

        // Normalisasi placeholder tanpa "$" menjadi Blade variable valid
        $normalizePlaceholders = static function (string $html) {
            return preg_replace_callback('/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/', function ($matches) {
                $key = $matches[1];
                // Jika sudah punya $ di dalam, biarkan
                if (str_contains($key, '$')) {
                    return $matches[0];
                }
                return '{{ $' . $key . ' }}';
            }, $html);
        };

        // Ambil template dinamis berdasarkan layanan dari request
        $template = LetterTemplate::where('service_id', $request->service_id)
            ->where('status', 'active')
            ->first();

        if ($template && ($template->kop_html || $template->body_html)) {
            // Render kop dan isi menggunakan Blade::render (mendukung placeholder)
            $kopRendered = $template->kop_html
                ? $this->inlineImages(Blade::render($normalizePlaceholders($template->kop_html), $baseData))
                : '';

            $bodyRendered = $template->body_html
                ? $this->inlineImages(Blade::render($normalizePlaceholders($template->body_html), $baseData))
                : '';

            // Gabungkan ke dalam layout generik
            $htmlContent = View::make('letters.generic', [
                'kop_html' => $kopRendered,
                'body_html' => $bodyRendered,
                'qr_image_path' => $baseData['qr_image_path'] ?? null,
            ])->render();
        } else {
            // Fallback ke template Blade lama jika belum ada template dinamis
            $htmlContent = View::make('letters.surat_tidak_mampu', $baseData)->render();
        }

        // Update the request
        $request->generated_html_content = $htmlContent;
        $request->status = 'kades_review';
        $request->save();

        return response()->json([
            'message' => 'Letter generated successfully and is waiting for Kades review.',
            'request' => $request,
        ]);
    }

    /**
     * Preview the generated HTML letter.
     */
    public function preview(Request $request)
    {
        $user = Auth::user();
        if (!$user || !in_array($user->role, ['operator', 'kades'])) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if (empty($request->generated_html_content)) {
            return response('No preview available. Please generate the letter first.', 404);
        }

        return response($request->generated_html_content);
    }

    /**
     * Sign the letter by adding a QR code and converting to PDF.
     */
    public function sign(Request $request)
    {
        $user = Auth::user();
        if (!$user || $user->role !== 'kades') {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        if ($request->status !== 'kades_review') {
            return response()->json(['message' => 'Request is not ready for signing.'], 422);
        }

        $letterData = $request->letter_input_data;
        if (empty($letterData)) {
            return response()->json(['message' => 'No letter input data found'], 404);
        }

        // Gunakan QR statis dari public/qr/QR.png seperti implementasi saat ini
        $qrImagePath = public_path('qr/QR.png');

        $computedLetterNumber = '470/' . $request->id . '/' . Carbon::now()->format('m/Y');

        // Siapkan data dasar dengan flatten + alias nomor surat
        $baseData = array_merge(
            [
                'letter_number' => $computedLetterNumber,
                'no_surat' => $computedLetterNumber,
                'nomor_surat' => $computedLetterNumber,
                'nomor' => $computedLetterNumber,
                'request' => $request->toArray(),
                'citizen' => $letterData,
                'qr_image_path' => $qrImagePath,
            ],
            $letterData ?? []
        );

        // Normalisasi placeholder tanpa "$" menjadi Blade variable valid
        $normalizePlaceholders = static function (string $html) {
            return preg_replace_callback('/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/', function ($matches) {
                $key = $matches[1];
                if (str_contains($key, '$')) {
                    return $matches[0];
                }
                return '{{ $' . $key . ' }}';
            }, $html);
        };

        // Ambil template dinamis berdasarkan layanan dari request
        $template = LetterTemplate::where('service_id', $request->service_id)
            ->where('status', 'active')
            ->first();

        if ($template && ($template->kop_html || $template->body_html)) {
            $kopRendered = $template->kop_html
                ? $this->inlineImages(Blade::render($normalizePlaceholders($template->kop_html), $baseData))
                : '';

            $bodyRendered = $template->body_html
                ? $this->inlineImages(Blade::render($normalizePlaceholders($template->body_html), $baseData))
                : '';

            $html = View::make('letters.generic', [
                'kop_html' => $kopRendered,
                'body_html' => $bodyRendered,
                'qr_image_path' => $baseData['qr_image_path'] ?? null,
            ])->render();
        } else {
            // Fallback ke template Blade lama jika belum ada template dinamis
            $html = View::make('letters.surat_tidak_mampu', $baseData)->render();
        }

        // Simpan juga HTML yang sudah mengandung QR ke generated_html_content
        $request->generated_html_content = $html;
        $request->save();

        $pdf = Pdf::loadHTML($html)->setPaper('A4', 'portrait');

        $filename = 'signed_letter_' . $request->id . '_' . time() . '.pdf';
        $path = 'signed_letters/' . $filename;

        Storage::disk('local')->put($path, $pdf->output());

        $request->outputs()->create([
            'file_name' => $filename,
            'file_path' => $path,
        ]);

        $request->update(['status' => 'approved']);

        return response()->json([
            'message' => 'Letter signed successfully',
            'file_path' => $path,
            'qr_image_path' => $qrImagePath,
        ]);
    }

    /**
     * Convert local/public images in HTML to base64 data URIs (DomPDF friendly).
     */
    private function inlineImages(string $html): string
    {
        return preg_replace_callback('/<img\s+[^>]*src=["\']([^"\']+)["\'][^>]*>/i', function ($matches) {
            $src = $matches[1];

            // Skip if already data URI or remote URL
            if (Str::startsWith($src, ['data:image'])) {
                return $matches[0];
            }

            $localPath = null;

            // Handle absolute URL
            if (Str::startsWith($src, ['http://', 'https://'])) {
                $parsed = parse_url($src);
                $path = $parsed['path'] ?? '';
                $localPath = public_path(ltrim($path, '/'));

                // If host exists and not matching app, but file is present locally by path, still allow
                if (!file_exists($localPath)) {
                    $appHost = parse_url(config('app.url', ''), PHP_URL_HOST);
                    if (!empty($parsed['host']) && $appHost && $parsed['host'] !== $appHost) {
                        return $matches[0];
                    }
                }
            } else {
                // Relative path
                $localPath = public_path(ltrim($src, '/'));
            }

            if (!file_exists($localPath)) {
                return $matches[0];
            }

            $mime = mime_content_type($localPath) ?: 'image/png';
            $data = base64_encode(file_get_contents($localPath));
            $dataUri = "data:{$mime};base64,{$data}";

            // Replace src only, keep other attributes
            return str_replace($src, $dataUri, $matches[0]);
        }, $html);
    }
}
