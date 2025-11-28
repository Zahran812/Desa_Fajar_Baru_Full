<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AgendaController extends Controller
{
    /**
     * Simpan agenda baru.
     * (Menangani request POST ke /api/agenda)
     */
    public function store(Request $request)
    {
        // 1. Validasi Data
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            // Pastikan format tanggal/waktu sesuai dengan yang dikirim dari frontend
            'date' => 'required|date_format:Y-m-d', 
            'time' => 'required|date_format:H:i', // Format HH:MM (atau sesuaikan)
            'location' => 'required|string|max:255',
            'category' => ['required', 'string', Rule::in(['rapat', 'kesehatan', 'sosial', 'pendidikan', 'keagamaan', 'olahraga', 'lainnya'])],
            'status' => ['nullable', 'string', Rule::in(['scheduled', 'completed', 'cancelled'])],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Data agenda tidak valid',
                'errors' => $validator->errors(),
            ], 422);
        }

        // 2. Simpan ke Database
        try {
            $agenda = Agenda::create([
                'title' => $request->title,
                'description' => $request->description,
                'date' => $request->date,
                'time' => $request->time,
                'location' => $request->location,
                'category' => $request->category,
                'status' => $request->status ?? 'scheduled', // Default 'scheduled'
                'user_id' => auth()->id(), // Ambil ID pengguna yang sedang login (Operator)
            ]);

            // 3. Berikan Respon Sukses
            return response()->json([
                'message' => 'Agenda berhasil disimpan!',
                'agenda' => $agenda,
            ], 201);

        } catch (\Exception $e) {
            // Log error untuk debugging
            \Log::error('Error saving agenda: ' . $e->getMessage()); 
            return response()->json([
                'message' => 'Terjadi kesalahan saat menyimpan agenda.',
            ], 500);
        }
    }

    /**
     * Update agenda yang sudah ada.
     * (Menangani request PUT ke /api/agenda/{id})
     */
    public function update(Request $request, Agenda $agenda)
    {
        // ... (Logika validasi dan update serupa dengan store, pastikan otorisasi)

        // Contoh singkat:
        $agenda->update($request->all());
        
        return response()->json([
            'message' => 'Agenda berhasil diperbarui!',
            'agenda' => $agenda,
        ]);
    }
    
    // Anda juga perlu method index(), show(), dan destroy()
    
    /**
     * Ambil semua agenda
     * (Menangani request GET ke /api/agenda)
     */
    public function index()
    {
        $agendas = Agenda::orderBy('date', 'desc')->get(); // Urutkan dari yang terbaru

        return response()->json([
            'agendas' => $agendas,
        ]);
    }

    /**
     * Hapus agenda.
     * (Menangani request DELETE ke /api/agenda/{id})
     */
    public function destroy(Agenda $agenda)
    {
        try {
            // Opsional: Cek otorisasi (pastikan hanya operator/admin yang bisa hapus)
            // if (auth()->user()->role !== 'operator' && auth()->user()->role !== 'admin') {
            //     return response()->json(['message' => 'Unauthorized'], 403);
            // }

            $agenda->delete();

            return response()->json([
                'message' => 'Agenda berhasil dihapus!',
            ], 200);

        } catch (\Exception $e) {
            \Log::error('Error deleting agenda: ' . $e->getMessage());
            return response()->json([
                'message' => 'Terjadi kesalahan saat menghapus agenda.',
            ], 500);
        }
    }
}