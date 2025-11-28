<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class RequestDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'request_id',
        'required_name',
        'file_path',
        'original_name'
    ];

    protected $table = 'request_documents';

    // Tambahkan appends untuk file_url
    protected $appends = ['file_url'];

    /**
     * Relasi Many-to-One ke Request
     */
    public function request(): BelongsTo
    {
        return $this->belongsTo(Request::class);
    }

    /**
     * Accessor untuk mendapatkan URL publik dokumen
     * Gunakan file_url, bukan file_path
     */
    public function getFileUrlAttribute(): string
    {
        if (empty($this->attributes['file_path'])) {
            return '';
        }

        // Jika sudah berupa URL, return as is
        if (filter_var($this->attributes['file_path'], FILTER_VALIDATE_URL)) {
            return $this->attributes['file_path'];
        }

        // Menggunakan Storage::url() untuk mendapatkan URL lengkap
        return Storage::url($this->attributes['file_path']);
    }
}