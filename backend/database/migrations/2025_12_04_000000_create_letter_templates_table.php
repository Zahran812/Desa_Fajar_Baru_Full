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
        Schema::create('letter_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->string('name', 150); // Nama template (contoh: "Template Surat Keterangan Domisili")
            $table->string('file_path'); // Path file di storage private (e.g., letter-templates/service_1/template.docx)
            $table->string('file_name'); // Nama file asli (untuk download)
            $table->string('mime_type'); // Tipe file (application/msword, application/pdf, dll)
            $table->bigInteger('file_size'); // Ukuran file dalam bytes
            $table->string('status')->default('active'); // active, inactive
            $table->text('description')->nullable(); // Deskripsi template
            $table->timestamps();

            // Index untuk pencarian cepat
            $table->index('service_id');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('letter_templates');
    }
};
