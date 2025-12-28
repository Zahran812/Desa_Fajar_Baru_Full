<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChatThread extends Model
{
    use HasFactory;

    protected $fillable = [
        'citizen_user_id',
        'operator_user_id',
        'chat_category_id',
        'subject',
        'citizen_last_read_at',
        'operator_last_read_at',
    ];

    protected $casts = [
        'citizen_last_read_at' => 'datetime',
        'operator_last_read_at' => 'datetime',
    ];

    public function category()
    {
        return $this->belongsTo(ChatCategory::class, 'chat_category_id');
    }

    public function messages()
    {
        return $this->hasMany(ChatMessage::class);
    }

    public function citizen()
    {
        return $this->belongsTo(User::class, 'citizen_user_id');
    }

    public function operator()
    {
        return $this->belongsTo(User::class, 'operator_user_id');
    }
}
