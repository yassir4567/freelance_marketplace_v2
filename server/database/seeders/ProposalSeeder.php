<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\Project;
use App\Models\Proposal;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $freelancers = Freelancer::all('id');
        $projects = Project::all();

        foreach ($projects as $project) {

            if ($project->status == 'open') {
                $count = rand(1, $freelancers->count());

                $randomFreelancers = $freelancers->shuffle()->take($count);

                foreach ($randomFreelancers as $freelancer) {
                    Proposal::factory()->pending()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancer->id,
                    ]);
                }
            }

            if ($project->status == 'in_review') {
                $count = rand(1, $freelancers->count());

                $randomFreelancers = $freelancers->shuffle()->take($count);

                Proposal::factory()->create([
                    'project_id' => $project->id,
                    'freelancer_id' => $randomFreelancers->first()->id,
                    'status' => fake()->randomElement(['accepted', 'rejected'])
                ]);

                $randomFreelancers = $randomFreelancers->skip(1);

                foreach ($randomFreelancers as $freelancer) {
                    Proposal::factory()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancer->id,
                        'status' => fake()->randomElement(['pending', 'accepted', 'rejected'])
                    ]);
                }
            }

            if ($project->status == 'in_progress' || $project->status == 'completed') {

                $count = rand(4, $freelancers->count());

                $randomFreelancers = $freelancers->shuffle()->take($count);

                Proposal::factory()->contracted()->create([
                    'project_id' => $project->id,
                    'freelancer_id' => $randomFreelancers->first()->id
                ]);

                $randomFreelancers = $randomFreelancers->skip(1);

                foreach ($randomFreelancers as $freelancer) {
                    Proposal::factory()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancer->id,
                        'status' => fake()->randomElement(['rejected', 'revoked'])
                    ]);
                }
            }
        }

    }
}
