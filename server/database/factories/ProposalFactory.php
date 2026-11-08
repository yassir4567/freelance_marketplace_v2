<?php

namespace Database\Factories;

use App\Enums\ProposalStatus;
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
            'status' => ProposalStatus::PENDING
        ]);
    }

    public function accepted()
    {
        return $this->state([
            'status' => ProposalStatus::ACCEPTED
        ]);
    }

    public function rejected()
    {
        return $this->state([
            'status' => ProposalStatus::REJECTED
        ]);
    }

    public function revoked()
    {
        return $this->state([
            'status' => ProposalStatus::REVOKED
        ]);
    }

    public function contracted()
    {
        return $this->state([
            'status' => ProposalStatus::CONTRACTED
        ]);
    }
}
