<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'username',
        'email',
        'phone',
        'password_hash',
        'full_name',
        'role',
        'status',
        'rt_number',
        'address',
        'last_login_at'
    ];

    protected $hidden = [
        'password_hash',
    ];
    public function getAuthPassword()
    {
        return $this->password_hash;
    }
}
