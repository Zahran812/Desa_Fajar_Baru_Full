<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('phone', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
        }

        return response()->json([
            'success' => false,
            'error' => 'Invalid phone or password'
        ], 401);
    }

    public function me(Request $request)
    {
        // Mendapatkan objek user yang sedang login
        $user = Auth::user(); 

        // Karena model Anda memiliki $hidden = ['password_hash'], 
        // secara default hash password tidak akan ikut direspons.

        if (!$user) {
            // Sebenarnya ini jarang terjadi karena sudah dicek di middleware,
            // tetapi ini adalah safety check.
            return response()->json([
                'error' => 'User not found or unauthenticated'
            ], 401); 
        }

        // Ambil atribut yang spesifik (seperti yang Anda lakukan di PDO)
        // dan kembalikan dalam format JSON.
        // Anda tidak perlu menggunakan SELECT * karena Laravel sudah mengurusnya.
        
        return response()->json([
            'success' => true,
            'user' => [
                'id'          => $user->id,
                'username'    => $user->username,
                'email'       => $user->email,
                'full_name'   => $user->full_name,
                'role'        => $user->role,
                'rt_number'   => $user->rt_number,
                
                // Jika Anda ingin semua kolom yang tidak tersembunyi:
                // 'all_data' => $user->toArray() 
            ]
        ], 200);
    }
}
