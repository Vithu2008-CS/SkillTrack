<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Skill;
use App\Models\Milestone;
use App\Models\Badge;
use Inertia\Inertia;

class SkillController extends Controller
{
    public function index()
    {
        // Load skills with milestones, sorted by category and name
        $skills = Skill::with('milestones')->orderBy('category')->orderBy('name')->get();
        $badges = Badge::orderBy('id')->get();

        // Compile quick summary metrics to pass directly
        $totalSkills = $skills->count();
        $completedSkills = $skills->where('progress', 100)->count();
        $totalMilestones = Milestone::count();
        $completedMilestones = Milestone::where('completed', true)->count();
        $earnedBadges = $badges->whereNotNull('earned_at')->count();

        return Inertia::render('Dashboard', [
            'skills' => $skills,
            'badges' => $badges,
            'stats' => [
                'totalSkills' => $totalSkills,
                'completedSkills' => $completedSkills,
                'totalMilestones' => $totalMilestones,
                'completedMilestones' => $completedMilestones,
                'earnedBadges' => $earnedBadges,
                'overallProgress' => $totalMilestones > 0 
                    ? (int)(($completedMilestones / $totalMilestones) * 100) 
                    : 0,
            ]
        ]);
    }

    public function toggleMilestone(Milestone $milestone)
    {
        // Toggle completed status
        $milestone->completed = !$milestone->completed;
        $milestone->save();

        // Recalculate skill progress
        $skill = $milestone->skill;
        $totalMilestones = $skill->milestones()->count();
        $completedMilestones = $skill->milestones()->where('completed', true)->count();
        
        $skill->milestones_count = $totalMilestones;
        $skill->milestones_completed = $completedMilestones;
        $skill->progress = $totalMilestones > 0 
            ? (int)(($completedMilestones / $totalMilestones) * 100) 
            : 0;
        $skill->save();

        // Re-evaluate badge earnings
        $this->evaluateBadges();

        // Return to the dashboard (Inertia updates automatically)
        return redirect()->back();
    }

    private function evaluateBadges()
    {
        $badges = Badge::all();
        $totalCompletedMilestones = Milestone::where('completed', true)->count();
        $completedSkillsCount = Skill::where('progress', 100)->count();

        foreach ($badges as $badge) {
            $shouldEarn = false;

            if ($badge->requirement_type === 'first_milestone') {
                $shouldEarn = $totalCompletedMilestones >= (int)$badge->requirement_value;
            } elseif ($badge->requirement_type === 'category_complete') {
                $category = $badge->requirement_value;
                $categorySkills = Skill::where('category', $category)->get();
                if ($categorySkills->count() > 0) {
                    $shouldEarn = $categorySkills->every(function ($s) {
                        return $s->progress === 100;
                    });
                }
            } elseif ($badge->requirement_type === 'total_completed_skills') {
                $shouldEarn = $completedSkillsCount >= (int)$badge->requirement_value;
            }

            if ($shouldEarn) {
                if (is_null($badge->earned_at)) {
                    $badge->earned_at = now();
                    $badge->save();
                }
            } else {
                if (!is_null($badge->earned_at)) {
                    $badge->earned_at = null;
                    $badge->save();
                }
            }
        }
    }
}
