<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\UserListController;
use App\Http\Controllers\UserApprovalController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\LetterTemplateController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\Dashboard\ArticleController as DashboardArticleController;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [RegisterController::class, 'register']);
Route::get('/agenda', [AgendaController::class, 'index']); // Untuk m\
Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('pubservices', [ServiceController::class, 'indexPublic']);
// Route ini dapat diakses publik untuk melihat detail 1 layanan
Route::get('services/{service}', [ServiceController::class, 'showPublic']);

// Download endpoints - handled manually auth di controller (support token via query param)
Route::get('requests/output/{id}/download', [RequestController::class, 'downloadOutput']);
Route::get('requests/document/{id}/download', [RequestController::class, 'downloadDocument']);

// --- Rute Publik untuk Berita/Artikel (Tanpa otentikasi) ---
Route::get('/articles', [ArticleController::class, 'index']);
Route::get('/articles/{slug}', [ArticleController::class, 'show']);
Route::get('/article-categories', [ArticleController::class, 'getUniqueCategories']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users/list', [UserListController::class, 'index']);
    Route::post('/approve-user', [UserApprovalController::class, 'approveUser']);
    // Agenda CRUD (Resource-like routes)
    Route::post('/agenda', [AgendaController::class, 'store']); // Untuk membuat agenda baru
    Route::put('/agenda/{agenda}', [AgendaController::class, 'update']); // Untuk update agenda
    Route::delete('/agenda/{agenda}', [AgendaController::class, 'destroy']); // Untuk delete agenda

    // Gallery CRUD
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::post('/gallery/{id}', [GalleryController::class, 'update']);
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']); // Untuk delete gallery

    Route::apiResource('services', ServiceController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::get('admin/services', [ServiceController::class, 'indexAdmin']);

    // Letter Templates routes
    Route::post('letter-templates', [LetterTemplateController::class, 'store']);
    Route::get('letter-templates/service/{service}', [LetterTemplateController::class, 'indexByService']);
    Route::get('letter-templates/{letterTemplate}/download', [LetterTemplateController::class, 'download'])->name('letter-templates.download');
    Route::get('letter-templates/{letterTemplate}/preview-pdf', [LetterTemplateController::class, 'previewPdf'])->name('letter-templates.preview-pdf');
    Route::post('letter-templates/{letterTemplate}/toggle-status', [LetterTemplateController::class, 'toggleStatus']);
    Route::put('letter-templates/{letterTemplate}', [LetterTemplateController::class, 'update']);
    Route::delete('letter-templates/{letterTemplate}', [LetterTemplateController::class, 'destroy']);


    Route::post('requests', [RequestController::class, 'store']); // Mengirim pengajuan baru
    Route::get('requests/me', [RequestController::class, 'index']); // Melihat daftar pengajuan sendiri
    Route::get('requests/all', [RequestController::class, 'indexAll']); // Melihat semua pengajuan (admin/operator)
    Route::put('requests/{id}/status', [RequestController::class, 'updateStatus']); // Update status ke in_progress
    Route::post('requests/{id}/approve', [RequestController::class, 'approve']); // Approve pengajuan
    Route::post('requests/{id}/verify', [RequestController::class, 'verify']); // Verify pengajuan
    Route::post('requests/{id}/reject', [RequestController::class, 'reject']); // Reject pengajuan

    // --- Rute untuk Operator Dashboard (Artikel/Berita) ---
    // Asumsi ada middleware 'role:operator' untuk memeriksa peran user
    Route::prefix('dashboard')->group(function () {
        Route::apiResource('articles', DashboardArticleController::class);
    });

    // --- Rute untuk Warga (memberi komentar) ---
    // Asumsi ada middleware 'role:citizen' untuk memeriksa peran user
    Route::post('/articles/{article}/comments', [CommentController::class, 'store']);
});
