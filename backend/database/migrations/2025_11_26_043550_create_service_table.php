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
        Schema::create('services', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->text('description');
            // requirements disimpan sebagai JSON string di database
            $table->json('requirements')->comment('Menyimpan array persyaratan layanan'); 
            $table->string('processing_time', 100);
            $table->unsignedInteger('fee')->default(0);
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->string('category', 50)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('services');
    }
};