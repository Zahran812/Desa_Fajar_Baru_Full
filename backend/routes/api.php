<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::post(uri: '/login', action: [AuthController::class, 'login']);
Route::get(uri:'/me', action: [AuthController::class, 'me']);