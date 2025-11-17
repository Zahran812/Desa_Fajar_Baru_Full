<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('citizens', function (Blueprint $table) {
            $table->string('gender')->nullable()->change();
            $table->string('birth_date')->nullable()->change();
        });
    }
};

