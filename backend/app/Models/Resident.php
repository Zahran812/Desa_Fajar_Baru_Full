<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Resident extends Model
{
    protected $fillable = [
        'dusun_id',
        'nik',
        'no_kk',
        'nama_lengkap',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'umur',
        'alamat',
        'rt',
        'rw',
        'agama',
        'pendidikan_terakhir',
        'pekerjaan',
        'golongan_darah',
        'status_perkawinan',
        'status_dalam_keluarga',
        'status_hubungan_dalam_keluarga',
        'nama_ayah',
        'nama_ibu',
        'phone',
    ];

    public function dusun(): BelongsTo
    {
        return $this->belongsTo(Dusun::class);
    }
}
