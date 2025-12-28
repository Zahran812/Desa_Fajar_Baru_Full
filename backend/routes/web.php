<?php

use App\Models\Article;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

Route::get('/', function () {
    return view('welcome');
});

// Share endpoint dengan meta OG statis untuk crawler (WhatsApp, FB, dsb)
Route::get('/share/{slug}', function (string $slug) {
    $article = Article::where('slug', $slug)
        ->where('status', 'published')
        ->firstOrFail();

    $frontendUrl = rtrim(env('FRONTEND_URL', config('app.url')), '/');
    $targetUrl = $frontendUrl . '/berita/' . $article->slug;

    $imageUrl = $article->image_url;
    if ($imageUrl && !Str::startsWith($imageUrl, ['http://', 'https://'])) {
        $imageUrl = rtrim(config('app.url'), '/') . $imageUrl;
    }

    $description = $article->excerpt ?: Str::limit(strip_tags($article->content), 150, '...');

    return response()->view('share', [
        'title' => $article->title,
        'description' => $description,
        'image' => $imageUrl,
        'url' => $targetUrl,
    ]);
});
