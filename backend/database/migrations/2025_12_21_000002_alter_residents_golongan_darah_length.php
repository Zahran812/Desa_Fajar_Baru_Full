<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Perbesar panjang kolom golongan_darah agar muat nilai seperti "TIDAK TAHU"
        DB::statement('ALTER TABLE residents MODIFY golongan_darah VARCHAR(50) NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Kembalikan ke panjang awal 5 karakter
        DB::statement('ALTER TABLE residents MODIFY golongan_darah VARCHAR(5) NULL');
    }
};
