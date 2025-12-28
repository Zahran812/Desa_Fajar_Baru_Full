<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Dusun extends Model
{
    protected $fillable = [
        'name',
        'dusun_head_user_id',
        'rt_count',
        'population_count',
        'male_count',
        'female_count',
    ];

    public function dusunHead(): BelongsTo
    {
        return $this->belongsTo(User::class, 'dusun_head_user_id');
    }

    public function residents(): HasMany
    {
        return $this->hasMany(Resident::class);
    }
}
