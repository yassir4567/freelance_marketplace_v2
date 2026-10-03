<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $clients = User::where('role', 'client')->get();
        $categories = Category::pluck('id');
        $skills = Skill::pluck('id');

        foreach ($clients as $client) {
            $projects = Project::factory()->open()->count(rand(0, 3))->create([
                'client_id' => $client->id,
                'category_id' => $categories->random()
            ]);

            $this->attachRandomSkills($projects, $skills);

            $projects = Project::factory()->in_review()->count(rand(0, 3))->create([
                'client_id' => $client->id,
                'category_id' => $categories->random()
            ]);

            $this->attachRandomSkills($projects, $skills);

            $projects = Project::factory()->in_progress()->count(rand(0, 3))->create([
                'client_id' => $client->id,
                'category_id' => $categories->random()
            ]);

            $this->attachRandomSkills($projects, $skills);

            $projects = Project::factory()->completed()->count(rand(0, 3))->create([
                'client_id' => $client->id,
                'category_id' => $categories->random()
            ]);

            $this->attachRandomSkills($projects, $skills);
        }
    }

    public function attachRandomSkills($projects, $skills)
    {
        $projects->each(function ($project) use ($skills) {
            $count = rand(2, min(7, $skills->count()));
            $project->skills()->attach(
                $skills->random($count)
            );
        });
    }
}
