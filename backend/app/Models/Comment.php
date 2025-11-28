<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $fillable = ['article_id', 'citizen_id', 'content'];

    /**
     * Get the citizen that owns the comment.
     */
    public function citizen()
    {
        return $this->belongsTo(Citizen::class, 'citizen_id');
    }

    /**
     * Get the article that the comment belongs to.
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }
}