<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request as HttpRequest;
use App\Models\Request;
use App\Models\RequestOutput;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Carbon\Carbon;
use Barryvdh\DomPDF\Facade\Pdf;

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

        // Render the blade view to an HTML string for preview
        $data = [
            'letter_number' => $letterNumber,
            'request' => $request->toArray(),
            'citizen' => $letterData,
        ];
        $htmlContent = View::make('letters.surat_tidak_mampu', $data)->render();

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

        // Use a static dummy QR image from public/qr/QR.png instead of generating dynamically
        $qrImagePath = public_path('qr/QR.png');

        $data = [
            'letter_number' => '470/' . $request->id . '/' . Carbon::now()->format('m/Y'),
            'request' => $request->toArray(),
            'citizen' => $letterData,
            'qr_image_path' => $qrImagePath,
        ];

        $html = View::make('letters.surat_tidak_mampu', $data)->render();

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
}
