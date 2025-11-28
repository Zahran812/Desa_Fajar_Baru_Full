<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RequestOutput extends Model
{
    protected $fillable = [
        'request_id',
        'file_name',
        'file_path',
    ];

    public function request()
    {
        return $this->belongsTo(Request::class);
    }
}
