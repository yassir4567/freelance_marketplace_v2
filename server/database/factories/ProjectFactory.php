<?php

namespace Database\Factories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(rand(5, 10), true),
            'budget' => fake()->randomFloat(2, 50, 10000),
            'experienceLevel' => fake()->randomElement(['junior', 'mid-level', 'senior']),
            'size' => fake()->randomElement(['small', 'medium', 'large']),
            'duration' => fake()->randomElement([
                'less_than_1_month',
                '1_to_2_month',
                '2_to_4_month',
                '4_to_6_month',
                '6_to_9_month',
                '9_to_10_month',
                '10_to_12_month',
                'more_than_1_year'
            ]),
        ];
    }

    public function open()
    {
        return $this->state([
            'status' => 'open'
        ]);
    }

    public function in_review()
    {
        return $this->state([
            'status' => 'in_review'
        ]);
    }

    public function in_progress()
    {
        return $this->state([
            'status' => 'in_progress'
        ]);
    }

    public function closed()
    {
        return $this->state([
            'status' => 'closed'
        ]);
    }
    public function draft()
    {
        return $this->state([
            'status' => 'draft'
        ]);
    }

    public function completed()
    {
        return $this->state([
            'status' => 'completed'
        ]);
    }

    public function cancelled()
    {
        return $this->state([
            'status' => 'cancelled'
        ]);
    }
}
