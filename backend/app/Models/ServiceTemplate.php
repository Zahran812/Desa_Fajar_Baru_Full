<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class ServiceTemplate extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id', 
        'name', 
        'file_url' // Akan menyimpan path/URL publik file
    ];

    /**
     * Relasi ke layanan
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function getFileUrlAttribute($value): string
    {
        // Pastikan $value (path di DB) tidak kosong sebelum diolah
        if (empty($value)) {
            return ''; 
        }
        
        // Storage::url() akan menggunakan APP_URL/.env sebagai dasar.
        return Storage::url($value);
    }
}