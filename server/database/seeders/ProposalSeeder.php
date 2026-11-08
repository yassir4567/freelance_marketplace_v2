<?php

namespace Database\Seeders;

use App\Enums\ProjectStatus;
use App\Enums\ProposalStatus;
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

            if ($project->status == ProjectStatus::OPEN) {
                $count = rand(1, $freelancers->count());

                $randomFreelancers = $freelancers->shuffle()->take($count);

                foreach ($randomFreelancers as $freelancer) {
                    Proposal::factory()->pending()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancer->id,
                    ]);
                }
            }

            if ($project->status == ProjectStatus::IN_REVIEW) {
                $count = rand(1, $freelancers->count());

                $randomFreelancers = $freelancers->shuffle()->take($count);

                Proposal::factory()->create([
                    'project_id' => $project->id,
                    'freelancer_id' => $randomFreelancers->first()->id,
                    'status' => fake()->randomElement([ProposalStatus::ACCEPTED, ProposalStatus::REJECTED])
                ]);

                $randomFreelancers = $randomFreelancers->skip(1);

                foreach ($randomFreelancers as $freelancer) {
                    Proposal::factory()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancer->id,
                        'status' => fake()->randomElement([ProposalStatus::PENDING, ProposalStatus::ACCEPTED, ProposalStatus::REJECTED])
                    ]);
                }
            }

            if ($project->status == ProjectStatus::CLOSED) {
                $count = rand(1, $freelancers->count());
                $randomFreelancers = $freelancers->shuffle()->take($count);

                foreach ($randomFreelancers as $freelancer) {
                    Proposal::factory()->rejected()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancer->id,
                    ]);
                }
            }

            if ($project->status == ProjectStatus::IN_PROGRESS || $project->status == ProjectStatus::COMPLETED) {

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
                        'status' => fake()->randomElement([ProposalStatus::REJECTED, ProposalStatus::REVOKED])
                    ]);
                }
            }

            if ($project->status == ProjectStatus::CANCELLED) {
                $count = rand(4, $freelancers->count());

                $randomFreelancers = $freelancers->shuffle()->take($count);

                Proposal::factory()->contracted()->create([
                    'project_id' => $project->id,
                    'freelancer_id' => $randomFreelancers->first()->id,
                ]);

                $randomFreelancers = $randomFreelancers->skip(1);

                foreach ($randomFreelancers as $freelancer) {
                    Proposal::factory()->create([
                        'project_id' => $project->id,
                        'freelancer_id' => $freelancer->id,
                        'status' => fake()->randomElement([ProposalStatus::REJECTED, ProposalStatus::REVOKED])
                    ]);
                }
            }
        }

    }
}
