<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update ENUM status untuk menambahkan 'in_progress' dan 'approved'
        DB::statement("ALTER TABLE requests MODIFY COLUMN status ENUM('pending', 'in_progress', 'approved', 'rejected') DEFAULT 'pending'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Kembalikan ke ENUM lama
        DB::statement("ALTER TABLE requests MODIFY COLUMN status ENUM('pending', 'processing', 'completed', 'rejected') DEFAULT 'pending'");
    }
};
