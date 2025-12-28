<?php

namespace Database\Seeders;

use App\Models\ChatCategory;
use Illuminate\Database\Seeder;

class ChatCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rows = [
            ['key' => 'chat', 'label' => 'Chat'],
            ['key' => 'administrasi', 'label' => 'Layanan Administrasi'],
            ['key' => 'ppid', 'label' => 'PPID'],
            ['key' => 'pengaduan', 'label' => 'Pengaduan'],
            ['key' => 'aspirasi', 'label' => 'Aspirasi'],
        ];

        foreach ($rows as $row) {
            ChatCategory::query()->updateOrCreate(['key' => $row['key']], $row);
        }
    }
}
