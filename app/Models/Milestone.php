<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    protected $fillable = [
        'skill_id',
        'name',
        'completed',
    ];

    protected $casts = [
        'completed' => 'boolean',
    ];

    public function skill()
    {
        return $this->belongsTo(Skill::class);
    }
}
