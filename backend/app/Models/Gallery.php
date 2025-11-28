<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

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
        // Jika tidak ada nilai, kembalikan string kosong
        if (empty($value)) {
            return '';
        }

        // Storage::url() akan secara otomatis menambahkan APP_URL/storage/
        // yang sesuai dengan konfigurasi disk 'public'.
        return Storage::url($value);
    }
}