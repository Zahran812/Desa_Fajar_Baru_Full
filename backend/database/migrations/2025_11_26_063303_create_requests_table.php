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
        Schema::create('requests', function (Blueprint $table) {
            $table->id();

            // Foreign keys
            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->foreignId('service_id')
                  ->constrained('services')
                  ->onDelete('cascade');

            // Main fields
            $table->string('request_type'); // nama layanan, misal "Surat Domisili"
            $table->string('subject');
            $table->text('description');

            // Status bawaan
            $table->enum('status', ['pending', 'processing', 'completed', 'rejected'])
                  ->default('pending');

            // Response dari petugas (optional)
            $table->text('response')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
