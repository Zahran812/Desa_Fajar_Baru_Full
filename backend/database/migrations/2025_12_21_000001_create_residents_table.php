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
        Schema::create('residents', function (Blueprint $table) {
            $table->id();
            $table->foreignId('dusun_id')->constrained('dusuns')->cascadeOnDelete();

            // Identitas
            $table->string('nik')->unique();
            $table->string('no_kk')->nullable()->index();
            $table->string('nama_lengkap');
            $table->string('jenis_kelamin', 20)->nullable();
            $table->string('tempat_lahir')->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->unsignedInteger('umur')->nullable();

            // Alamat
            $table->string('alamat', 255)->nullable();
            $table->string('rt', 16)->nullable()->index();
            $table->string('rw', 16)->nullable()->index();

            // Sosial
            $table->string('agama')->nullable();
            $table->string('pendidikan_terakhir')->nullable();
            $table->string('pekerjaan')->nullable();
            $table->string('golongan_darah', 5)->nullable();
            $table->string('status_perkawinan')->nullable();
            $table->string('status_dalam_keluarga')->nullable();
            $table->string('status_hubungan_dalam_keluarga')->nullable();
            $table->string('nama_ayah')->nullable();
            $table->string('nama_ibu')->nullable();
            $table->string('phone', 30)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('residents');
    }
};
