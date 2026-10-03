<?php

namespace Database\Factories;

use App\Models\Proposal;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Proposal>
 */
class ProposalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $units = ['day', 'month', 'year'];

        $unit = fake()->randomElement($units);
        $num = fake()->numberBetween(1, 15);

        return [
            'coverLetter' => fake()->paragraphs(rand(3, 5), true),
            'proposedDuration' => $num . $unit,
            'proposedPrice' => fake()->randomFloat(2, 50, 10000)
        ];
    }

    public function pending()
    {
        return $this->state([
            'status' => 'pending'
        ]);
    }

    public function accepted()
    {
        return $this->state([
            'status' => 'accepted'
        ]);
    }

    public function rejected()
    {
        return $this->state([
            'status' => 'rejected'
        ]);
    }

    public function revoked()
    {
        return $this->state([
            'status' => 'revoked'
        ]);
    }

    public function contracted()
    {
        return $this->state([
            'status' => 'contracted'
        ]);
    }
}
