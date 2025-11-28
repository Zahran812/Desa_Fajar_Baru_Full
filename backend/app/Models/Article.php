<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage; // Added to fix error

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'excerpt', 'content', 'image_path', 'status', 'category', 'views', 'user_id', 'published_at'
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Add 'image_url' to $appends array to include it in JSON serialization
    protected $appends = ['image_url'];

    /**
     * Get the user that authored the article.
     */
    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get the comments for the article.
     */
    public function comments()
    {
        return $this->hasMany(Comment::class)->orderBy('created_at', 'desc');
    }

    /**
     * Get the full URL for the article's image.
     */
    public function getImageUrlAttribute()
    {
        if ($this->image_path) {
            // Storage::url() will automatically prepend APP_URL/storage/
            return Storage::url($this->image_path);
        }
        return null; // Or a default image URL like asset('images/default-article.jpg')
    }
}