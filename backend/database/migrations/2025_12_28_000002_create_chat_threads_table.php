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
        Schema::create('chat_threads', function (Blueprint $table) {
            $table->id();

            $table->foreignId('citizen_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('operator_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('chat_category_id')->constrained('chat_categories')->restrictOnDelete();

            $table->string('subject', 255);

            $table->timestamp('citizen_last_read_at')->nullable();
            $table->timestamp('operator_last_read_at')->nullable();

            $table->timestamps();

            $table->index(['citizen_user_id', 'updated_at']);
            $table->index(['operator_user_id', 'updated_at']);
            $table->unique(['citizen_user_id', 'operator_user_id', 'chat_category_id', 'subject'], 'chat_thread_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat_threads');
    }
};
