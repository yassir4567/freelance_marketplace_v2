<?php

namespace Database\Factories;

use App\Models\Deliverable;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Deliverable>
 */
class DeliverableFactory extends Factory
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
            'description' => fake()->paragraph(rand(3, 8), true),
        ];
    }

    public function pending()
    {
        return $this->state([
            'status' => 'pending'
        ]);
    }
    public function unlocked()
    {
        return $this->state([
            'status' => 'unlocked',
            'deadline' => fake()->dateTimeBetween('-5 day', '+15 day'),
            'unlocked_at' => fake()->dateTimeBetween('-20 days', '-6 day'),
        ]);
    }

    public function submitted()
    {
        $unlockedAt = fake()->dateTimeBetween('-20 days', '-8 day');
        return $this->state([
            'status' => 'submitted',
            'deadline' => fake()->dateTimeBetween('-5 day', '+15 day'),
            'unlocked_at' => $unlockedAt,
            'submitted_at' => fake()->dateTimeBetween($unlockedAt, 'now'),
            'submission_note' => fake()->paragraph(rand(1, 3), true),
            'deliverable_links' => [
                fake()->url(),
                fake()->url(),
                fake()->url()
            ]
        ]);
    }

    public function accepted()
    {
        $unlockedAt = fake()->dateTimeBetween('-20 days', '-8 day');
        $submittedAt = fake()->dateTimeBetween($unlockedAt, '-5 day');


        return $this->state([
            'status' => 'accepted',
            'deadline' => fake()->dateTimeBetween('-5 day', '+15 day'),
            'unlocked_at' => $unlockedAt,
            'submitted_at' => $submittedAt,
            'accepted_at' => fake()->dateTimeBetween($submittedAt, 'now'),
            'submission_note' => fake()->paragraph(rand(1, 3), true),
            'deliverable_links' => [
                fake()->url(),
                fake()->url(),
                fake()->url()
            ]
        ]);
    }

    public function revision_request()
    {
        $unlockedAt = fake()->dateTimeBetween('-20 days', '-8 day');
        $submittedAt = fake()->dateTimeBetween($unlockedAt, '-5 day');


        return $this->state([
            'status' => 'revision_request',
            'deadline' => fake()->dateTimeBetween('-5 day', '+15 day'),
            'unlocked_at' => $unlockedAt,
            'submitted_at' => $submittedAt,
            'revision_request_at' => fake()->dateTimeBetween($submittedAt, 'now'),
            'submission_note' => fake()->paragraph(rand(1, 3), true),
            'deliverable_links' => [
                fake()->url(),
                fake()->url(),
                fake()->url()
            ]
        ]);
    }
}
