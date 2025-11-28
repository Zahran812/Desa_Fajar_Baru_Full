<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Request extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'service_id',
        'request_type',
        'subject',
        'description',
        'status',
        'response'
    ];
    
    // Nama tabel yang benar adalah 'requests'
    protected $table = 'requests'; 

    /**
     * Relasi One-to-Many ke dokumen persyaratan
     */
    public function documents(): HasMany
    {
        return $this->hasMany(RequestDocument::class);
    }

    /**
     * Relasi Many-to-One ke User (Pengaju)
     */
    public function user(): BelongsTo
    {
        // Asumsi model User ada di App\Models\User
        return $this->belongsTo(User::class);
    }

    /**
     * Relasi Many-to-One ke Service (Jenis Layanan)
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    /**
     * Relasi One-to-Many ke file output hasil layanan
     */
    public function outputs(): HasMany
    {
        return $this->hasMany(RequestOutput::class);
    }
}