<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Citizen;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        \Log::info('REGISTER BODY:', $request->all());

        $validated = $request->validate([
            'phone'          => 'required|string|unique:users,phone',
            'password'       => 'required|string|min:6',

            'nik'            => 'required|string|unique:citizens,nik',
            'full_name'      => 'required|string',

            'birth_place'    => 'nullable|string',
            'birth_date'     => 'nullable|date',
            'gender'         => 'nullable|string',
            'blood_type'     => 'nullable|string',

            'address'        => 'nullable|string',
            'rt_number'      => 'nullable|string',
            'rw_number'      => 'nullable|string',
            'dusun'          => 'nullable|string',
            'village'        => 'nullable|string',
            'district'       => 'nullable|string',
            'regency'        => 'nullable|string',
            'province'       => 'nullable|string',

            'religion'       => 'nullable|string',
            'marital_status' => 'nullable|string',
            'occupation'     => 'nullable|string',
        ]);

        // 1️⃣ Create user
        $user = User::create([
            'username'    => $validated['phone'],
            'email'       => null,
            'phone'       => $validated['phone'],
            'password_hash' => Hash::make($validated['password']),
            'full_name'   => $validated['full_name'],
            'role'        => 'citizen',
            'status'      => 'pending',
            'rt_number'   => $validated['rt_number'] ?? null,
        ]);

        // 2️⃣ Create citizen data
        Citizen::create([
            'user_id'      => $user->id,
            'nik'          => $validated['nik'],
            'kk_number'    => null,
            'full_name'    => $validated['full_name'],

            'birth_place'  => $validated['birth_place'] ?? null,
            'birth_date'   => $validated['birth_date'] ?? null,
            'gender'       => $validated['gender'] ?? null,
            'blood_type'   => $validated['blood_type'] ?? null,

            'address'      => $validated['address'] ?? null,
            'rt_number'    => $validated['rt_number'] ?? null,
            'rw_number'    => $validated['rw_number'] ?? null,
            'dusun'        => $validated['dusun'] ?? null,
            'village'      => $validated['village'] ?? null,
            'district'     => $validated['district'] ?? null,
            'regency'      => $validated['regency'] ?? null,
            'province'     => $validated['province'] ?? null,

            'religion'     => $validated['religion'] ?? null,
            'marital_status' => $validated['marital_status'] ?? null,
            'occupation'   => $validated['occupation'] ?? null,
        ]);

        return response()->json([
            'message' => 'Registration successful, waiting for approval',
        ], 201);
    }
}
