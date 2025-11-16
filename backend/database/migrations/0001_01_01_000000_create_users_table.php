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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('username', 50)->unique();
            $table->string('email', 120)->nullable();
            $table->string('phone', 30)->unique();
            $table->string('password_hash', 255);
            $table->string('full_name', 120);
            $table->enum('role', ['operator', 'dusun_head', 'citizen'])->default('citizen');
            $table->enum('status', ['pending', 'active', 'inactive', 'rejected'])->default('pending');
            $table->string('rt_number', 16)->nullable();
            $table->string('address', 255)->nullable();
            $table->timestamp('last_login_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
