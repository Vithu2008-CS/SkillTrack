<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Skill;
use App\Models\Milestone;
use App\Models\Badge;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create a default user
        User::factory()->create([
            'name' => 'Alex Developer',
            'email' => 'alex@example.com',
            'password' => bcrypt('password'),
        ]);

        // 2. Define Skills & Milestones
        $skillsData = [
            [
                'name' => 'React Mastery',
                'category' => 'Frontend',
                'description' => 'Build modern, performant, and reactive user interfaces using component-driven designs.',
                'milestones' => [
                    ['name' => 'Understand Hooks & Custom Hooks', 'completed' => true],
                    ['name' => 'State Management (Zustand / Redux)', 'completed' => true],
                    ['name' => 'Performance tuning with React.memo & useMemo', 'completed' => false],
                    ['name' => 'Inertia.js integration for Laravel SPAs', 'completed' => false],
                ],
            ],
            [
                'name' => 'Laravel Architecture',
                'category' => 'Backend',
                'description' => 'Master the Laravel framework, including service container lifecycle, custom providers, and Eloquent ORM.',
                'milestones' => [
                    ['name' => 'Service Containers & Service Providers', 'completed' => true],
                    ['name' => 'Route Caching & Advanced Middleware', 'completed' => false],
                    ['name' => 'Eloquent Relations & Query Optimization', 'completed' => false],
                    ['name' => 'Custom Artisan Command implementation', 'completed' => false],
                ],
            ],
            [
                'name' => 'Tailwind CSS Styling',
                'category' => 'Design',
                'description' => 'Craft professional, highly customized responsive layouts using a utility-first methodology.',
                'milestones' => [
                    ['name' => 'Utility-first CSS fundamentals', 'completed' => true],
                    ['name' => 'Responsive layout configurations', 'completed' => true],
                    ['name' => 'Dark mode styling using classes', 'completed' => true],
                    ['name' => 'Customizing theme configuration in tailwind.config.js', 'completed' => false],
                ],
            ],
            [
                'name' => 'PostgreSQL Database Design',
                'category' => 'Database',
                'description' => 'Architect robust database systems, optimize schemas, and configure connection pools.',
                'milestones' => [
                    ['name' => 'Schema designs & table indexing', 'completed' => false],
                    ['name' => 'Optimization using query plans (EXPLAIN)', 'completed' => false],
                    ['name' => 'Connection pooling setups', 'completed' => false],
                    ['name' => 'Complex JSONB queries & custom functions', 'completed' => false],
                ],
            ],
            [
                'name' => 'Docker Containerization',
                'category' => 'DevOps',
                'description' => 'Package applications into portable Docker containers and orchestrate services using Docker Compose.',
                'milestones' => [
                    ['name' => 'Dockerfile writing and multi-stage builds', 'completed' => false],
                    ['name' => 'Container orchestration with Docker Compose', 'completed' => false],
                    ['name' => 'Local developer environment provisioning', 'completed' => false],
                    ['name' => 'CI/CD container integration pipelines', 'completed' => false],
                ],
            ],
        ];

        foreach ($skillsData as $data) {
            $skill = Skill::create([
                'name' => $data['name'],
                'category' => $data['category'],
                'description' => $data['description'],
                'milestones_count' => count($data['milestones']),
                'milestones_completed' => collect($data['milestones'])->where('completed', true)->count(),
            ]);

            // Calculate initial progress
            $skill->progress = $skill->milestones_count > 0 
                ? (int)(($skill->milestones_completed / $skill->milestones_count) * 100) 
                : 0;
            $skill->save();

            foreach ($data['milestones'] as $m) {
                Milestone::create([
                    'skill_id' => $skill->id,
                    'name' => $m['name'],
                    'completed' => $m['completed'],
                ]);
            }
        }

        // 3. Define Badges
        $badges = [
            [
                'name' => 'First Steps',
                'description' => 'Completed your very first learning milestone!',
                'icon_type' => 'star',
                'requirement_type' => 'first_milestone',
                'requirement_value' => '1',
            ],
            [
                'name' => 'Frontend Ninja',
                'description' => 'Successfully completed all Frontend category skills.',
                'icon_type' => 'shield',
                'requirement_type' => 'category_complete',
                'requirement_value' => 'Frontend',
            ],
            [
                'name' => 'Backend Guru',
                'description' => 'Successfully completed all Backend category skills.',
                'icon_type' => 'database',
                'requirement_type' => 'category_complete',
                'requirement_value' => 'Backend',
            ],
            [
                'name' => 'Fullstack Champion',
                'description' => 'Accomplished 4 or more completed skills in the dashboard.',
                'icon_type' => 'trophy',
                'requirement_type' => 'total_completed_skills',
                'requirement_value' => '4',
            ],
        ];

        foreach ($badges as $badgeData) {
            $badge = Badge::create($badgeData);

            // Check if requirement is met initially
            if ($badge->requirement_type === 'first_milestone') {
                $totalCompletedMilestones = Milestone::where('completed', true)->count();
                if ($totalCompletedMilestones >= (int)$badge->requirement_value) {
                    $badge->earned_at = now();
                    $badge->save();
                }
            }
            // Other badges are initially locked (earned_at = null)
        }
    }
}
