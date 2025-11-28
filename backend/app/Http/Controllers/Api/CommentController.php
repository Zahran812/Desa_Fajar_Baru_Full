<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Article $article)
    {
        try {
            $request->validate([
                'content' => 'required|string|max:2000',
            ]);

            $user = Auth::user();

            // Eager load citizen relation
            $user->load('citizen');

            if (!$user || !$user->citizen) {
                return response()->json(['message' => 'Hanya warga yang terdaftar dapat memberi komentar.'], 403);
            }

            $citizen = $user->citizen;

            $comment = $article->comments()->create([
                'citizen_id' => $citizen->id,
                'content' => $request->content,
            ]);

            return response()->json($comment->load('citizen:id,full_name'), 201);

        } catch (\Exception $e) {
            // Return the actual error message for debugging
            return response()->json([
                'message' => 'Terjadi kesalahan internal pada server.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}