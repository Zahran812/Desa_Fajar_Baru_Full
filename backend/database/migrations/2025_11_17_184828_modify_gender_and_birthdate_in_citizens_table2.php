<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('citizens', function (Blueprint $table) {

            // Ubah gender dari enum ke string
            $table->string('gender')->nullable()->change();

            // Ubah birth_date dari date ke string
            $table->string('birth_date')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('citizens', function (Blueprint $table) {

            // Balik lagi ke tipe awal
            $table->enum('gender', ['male', 'female'])->nullable()->change();
            $table->date('birth_date')->nullable()->change();
        });
    }
};
