<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Article::with('author:id,full_name')
                        ->where('status', 'published')
                        ->orderBy('published_at', 'desc');

        // Handle search query
        if ($request->filled('search')) {
            $searchTerm = $request->input('search');
            $query->where(function ($q) use ($searchTerm) {
                $q->where('title', 'like', '%' . $searchTerm . '%')
                  ->orWhere('excerpt', 'like', '%' . $searchTerm . '%')
                  ->orWhere('content', 'like', '%' . $searchTerm . '%');
            });
        }

        // Handle category filter
        if ($request->filled('category') && $request->input('category') !== 'semua') {
            $query->where('category', $request->input('category'));
        }

        // Handle limit for featured sections, otherwise paginate
        if ($request->filled('limit')) {
            $articles = $query->limit($request->input('limit'))->get();
        } else {
            $articles = $query->paginate(10); // Paginate for the main list
        }
                           
        return response()->json($articles);
    }

    /**
     * Display the specified resource.
     */
    public function show($slug)
    {
        $article = Article::with(['author:id,full_name', 'comments.citizen:id,full_name']) // FIX: Changed author.name to author.full_name
                          ->where('slug', $slug)
                          ->where('status', 'published')
                          ->firstOrFail();

        // Increment the view count atomically.
        $article->increment('views');

        return response()->json($article);
    }
}