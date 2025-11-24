<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserListController;
use App\Http\Controllers\UserApprovalController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\GalleryController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/agenda', [AgendaController::class, 'index']); // Untuk mengambil semua agenda (opsional)
Route::get('/gallery', [GalleryController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users/list', [UserListController::class, 'index']);
    Route::post('/approve-user', [UserApprovalController::class, 'approveUser']);
    // Agenda CRUD (Resource-like routes)
    Route::post('/agenda', [AgendaController::class, 'store']); // Untuk membuat agenda baru
    Route::put('/agenda/{agenda}', [AgendaController::class, 'update']); // Untuk update agenda
   
    // Gallery CRUD
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::post('/gallery/{id}', [GalleryController::class, 'update']);
});

