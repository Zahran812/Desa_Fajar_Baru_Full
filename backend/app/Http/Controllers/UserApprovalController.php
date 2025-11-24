<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserApprovalController extends Controller // Atau tambahkan method ini ke UserListController Anda
{
    /**
     * Ubah status User dari 'pending' menjadi 'active'.
     * Endpoint ini mengharapkan user_id di body request.
     */
    public function approveUser(Request $request)
    {
        // 1. Validasi Input
        $validator = Validator::make($request->all(), [
            'user_id' => 'required|exists:users,id|integer',
            // 'action' => 'required|in:approve', // Jika Anda hanya ingin memastikan action adalah 'approve'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'Validasi gagal', 'messages' => $validator->errors()], 400);
        }

        $userId = $request->user_id;

        // 2. Cari User
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User tidak ditemukan.'], 404);
        }

        // 3. Cek Status Saat Ini
        if ($user->status !== 'pending') {
            return response()->json(['error' => "Status user ID {$userId} sudah {$user->status}. Tidak bisa di-approve."], 409); // 409 Conflict
        }

        // 4. Update Status
        $user->status = 'active';
        $user->save();

        return response()->json([
            'message' => 'User berhasil diaktifkan.',
            'user' => [
                'id' => $user->id,
                'status' => $user->status,
                'role' => $user->role,
                'full_name' => $user->full_name // Contoh data yang dikembalikan
            ]
        ], 200);
    }
}