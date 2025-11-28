<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('service_templates', function (Blueprint $table) {
            $table->id();
            // Foreign Key ke tabel services. onDelete('cascade') akan menghapus template jika layanan dihapus.
            $table->foreignId('service_id')->constrained()->onDelete('cascade'); 
            $table->string('name', 150);
            // file_url akan menyimpan path relatif file di storage (e.g., template-dokumen/namafile.pdf)
            $table->string('file_url'); 
            $table->timestamps();

            // Opsional: Pastikan tidak ada duplikasi path file untuk satu layanan
            $table->unique(['service_id', 'file_url']); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_templates');
    }
};