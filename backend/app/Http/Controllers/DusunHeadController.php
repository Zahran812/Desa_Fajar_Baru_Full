<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class DusunHeadController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'max:50', 'unique:users,username'],
            'password' => ['required', 'string', 'min:6'],
            'full_name' => ['required', 'string', 'max:120'],
            'email' => ['nullable', 'email', 'max:120'],
            'phone' => ['required', 'string', 'max:30', 'unique:users,phone'],
            'address' => ['nullable', 'string', 'max:255'],
            'rt_number' => ['nullable', 'string', 'max:16'],
            'status' => ['nullable', Rule::in(['pending', 'active', 'inactive', 'rejected'])],
        ]);

        $user = User::create([
            'username' => $validated['username'],
            'email' => $validated['email'] ?? null,
            'phone' => $validated['phone'],
            'password_hash' => Hash::make($validated['password']),
            'full_name' => $validated['full_name'],
            'role' => 'dusun_head',
            'status' => $validated['status'] ?? 'active',
            'rt_number' => $validated['rt_number'] ?? null,
            'address' => $validated['address'] ?? null,
        ]);

        return response()->json([
            'message' => 'Akun kepala dusun berhasil dibuat',
            'user' => $user,
        ], Response::HTTP_CREATED);
    }
}
