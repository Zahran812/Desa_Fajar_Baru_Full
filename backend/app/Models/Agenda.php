<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'agendas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'date', // Menyimpan tanggal (YYYY-MM-DD)
        'time', // Menyimpan waktu (HH:MM:SS)
        'location',
        'category',
        'status', // 'scheduled', 'completed', dll.
        'user_id', // ID operator yang membuat agenda
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'date' => 'date', // Laravel akan menganggap ini sebagai objek Carbon
    ];

    /**
     * Get the user (operator) that owns the agenda.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}