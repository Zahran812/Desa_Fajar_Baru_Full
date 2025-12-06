<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'requirements',
        'processing_time',
        'fee',
        'status',
        'category_id',
    ];

    // Mengubah requirements dari JSON string menjadi array saat diakses
    protected $casts = [
        'requirements' => 'array',
        'fee' => 'integer',
    ];

    /**
     * Relasi ke template dokumen (persyaratan)
     */
    public function templates(): HasMany
    {
        return $this->hasMany(ServiceTemplate::class);
    }

    /**
     * Relasi ke template surat (letter templates)
     */
    public function letterTemplates(): HasMany
    {
        return $this->hasMany(LetterTemplate::class);
    }

    /**
     * Relasi ke kategori
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}