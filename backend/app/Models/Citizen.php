<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Citizen extends Model
{
    protected $fillable = [
        'user_id',
        'nik',
        'kk_number',
        'full_name',
        'birth_place',
        'birth_date',
        'gender',
        'blood_type',
        'address',
        'rt_number',
        'rw_number',
        'dusun',
        'village',
        'district',
        'regency',
        'province',
        'religion',
        'marital_status',
        'occupation',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
