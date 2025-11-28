<?php

namespace App\Http\Controllers\Api\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource for the dashboard.
     */
    public function index()
    {
        // FIX: Changed author eager loading from 'name' to 'full_name' to match user table column.
        $articles = Article::with('author:id,full_name')
                            ->orderBy('created_at', 'desc')
                            ->paginate(15);
        
        return response()->json($articles);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string|max:500',
            'status' => 'required|in:published,draft',
            'category' => 'required|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'published_at' => 'nullable|date',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            // REVISION: Store image using Storage facade to 'public' disk
            $imagePath = $request->file('image')->store('articles', 'public'); // 'articles' relative to storage/app/public
        }

        $article = Article::create([
            'title' => $validated['title'],
            'slug' => Str::slug($validated['title']) . '-' . uniqid(), // Ensure slug is unique
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'],
            'status' => $validated['status'],
            'category' => $validated['category'],
            'image_path' => $imagePath,
            'published_at' => $validated['status'] == 'published' ? ($validated['published_at'] ?? now()) : null,
            'user_id' => Auth::id(),
        ]);

        return response()->json($article, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Article $article)
    {
        // Return the article for the edit form
        return response()->json($article);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'excerpt' => 'required|string|max:500',
            'status' => 'required|in:published,draft',
            'category' => 'required|string|max:50',
            'image' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
            'published_at' => 'nullable|date',
        ]);
        
        $imagePath = $article->image_path;

        // Handle explicit image removal (if clear_image is sent from frontend)
        if ($request->has('clear_image') && $request->input('clear_image') === 'true') {
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = null;
        } elseif ($request->hasFile('image')) {
            // REVISION: Delete old image from storage disk and move new one
            if ($imagePath) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('articles', 'public');
        }

        // Update slug if title is changed
        $slug = $article->slug;
        if ($article->title !== $validated['title']) {
            $slug = Str::slug($validated['title']) . '-' . uniqid();
        }

        $article->update([
            'title' => $validated['title'],
            'slug' => $slug,
            'content' => $validated['content'],
            'excerpt' => $validated['excerpt'],
            'status' => $validated['status'],
            'category' => $validated['category'],
            'image_path' => $imagePath,
            'published_at' => $validated['status'] == 'published' ? ($validated['published_at'] ?? $article->published_at ?? now()) : null,
        ]);

        return response()->json($article);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Article $article)
    {
        // REVISION: Delete the image file from storage disk
        if ($article->image_path) {
            Storage::disk('public')->delete($article->image_path);
        }

        $article->delete();

        return response()->json(null, 204); // No Content
    }
}