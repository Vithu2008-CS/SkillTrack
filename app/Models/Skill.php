<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $fillable = [
        'name',
        'category',
        'description',
        'progress',
        'milestones_count',
        'milestones_completed',
    ];

    public function milestones()
    {
        return $this->hasMany(Milestone::class);
    }
}
