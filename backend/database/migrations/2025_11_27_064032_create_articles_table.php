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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique(); // Untuk URL yang bersih, cth: /berita/judul-artikel-ini
            $table->text('excerpt'); // Ringkasan singkat untuk tampilan daftar
            $table->longText('content');
            $table->string('image_path')->nullable();
            $table->enum('status', ['published', 'draft'])->default('draft');
            $table->foreignId('user_id')->comment('Author')->constrained('users')->onDelete('cascade'); // Relasi ke tabel users (operator)
            $table->timestamp('published_at')->nullable();
            $table->timestamps(); // created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};