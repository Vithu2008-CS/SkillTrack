<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    protected $fillable = [
        'name',
        'description',
        'icon_type',
        'requirement_type',
        'requirement_value',
        'earned_at',
    ];

    protected $casts = [
        'earned_at' => 'datetime',
    ];
}
