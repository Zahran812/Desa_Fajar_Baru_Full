<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LetterTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'name',
        'file_path',
        'file_name',
        'mime_type',
        'file_size',
        'status',
        'description',
    ];

    protected $casts = [
        'file_size' => 'integer',
    ];

    /**
     * Relasi ke Service
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Accessor untuk mendapatkan URL download file
     * File disimpan di storage private, jadi perlu endpoint khusus untuk download
     */
    public function getDownloadUrlAttribute(): string
    {
        return route('letter-templates.download', $this->id);
    }

    /**
     * Format ukuran file untuk display
     */
    public function getFormattedFileSizeAttribute(): string
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        $bytes = max($bytes, 0);
        $pow = floor(($bytes ? log($bytes) : 0) / log(1024));
        $pow = min($pow, count($units) - 1);
        $bytes /= (1 << (10 * $pow));

        return round($bytes, 2) . ' ' . $units[$pow];
    }
}
