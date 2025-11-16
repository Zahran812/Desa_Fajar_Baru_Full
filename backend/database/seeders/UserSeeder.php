<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash; // Import Hash Facade

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Buat User Operator Baru (yang Anda minta: phone 08123456789, password admin123)
        User::create([
            'username'      => 'operator_fajar',
            'email'         => 'operator@example.com',
            'phone'         => '08123456789',
            'password_hash' => Hash::make('admin123'), // 🔑 KUNCI: Wajib di-hash
            'full_name'     => 'Operator Fajar Baru',
            'role'          => 'operator',
            'status'        => 'active',
            'rt_number'     => '01',
            'address'       => 'Jl. Contoh Alamat No. 1',
            'last_login_at' => null,
        ]);

        // 2. Anda bisa menambahkan user lain di sini (misalnya untuk role admin)
        User::create([
            'username'      => 'admin_pusat',
            'email'         => 'admin@example.com',
            'phone'         => '08987654321',
            'password_hash' => Hash::make('warga123'),
            'full_name'     => 'Warga',
            'role'          => 'citizen',
            'status'        => 'active',
            'rt_number'     => '00',
            'address'       => 'Pusat Kantor',
            'last_login_at' => null,
        ]);
    }
}