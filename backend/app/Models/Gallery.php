<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image_url',
        'category',
        'status',
        'uploaded_by',
    ];

    public function uploader()
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
    
    // Mutator untuk mendapatkan URL publik gambar
    public function getImageUrlAttribute($value)
    {
        // Pastikan URL yang dikembalikan adalah URL publik yang dapat diakses.
        // Jika hosting di cloud (S3, dll), ganti 'storage' dengan method yang sesuai.
        return url('storage/' . $value);
    }
}