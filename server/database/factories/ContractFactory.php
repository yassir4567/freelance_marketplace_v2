<?php

namespace Database\Factories;

use App\Models\Contract;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Contract>
 */
class ContractFactory extends Factory
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
        ];
    }

    public function pending()
    {
        return $this->state([
            'status' => 'pending'
        ]);
    }

    public function rejected()
    {
        return $this->state([
            'status' => 'rejected'
        ]);
    }

    public function awaiting_freelancer_acceptance()
    {
        return $this->state([
            'status' => 'awaiting_freelancer_accept',
            'contract_pdf' => fake()->url(),
            'description' => fake()->paragraphs(rand(4, 7), true),
            'finalPrice' => fake()->randomFloat(2, 50, 10000),
            'finalDeadline' => fake()->dateTimeBetween('+1 day', '+30 days')->format('Y-m-d'),
        ]);
    }

    public function active()
    {
        return $this->state([
            'contract_pdf' => fake()->url(),
            'status' => 'active',
            'activated_at' => fake()->dateTimeBetween('-30 days', '-1 day'),
            'description' => fake()->paragraphs(rand(4, 7), true),
            'finalPrice' => fake()->randomFloat(2, 50, 10000),
            'finalDeadline' => fake()->dateTimeBetween('+1 day', '+30 days')->format('Y-m-d'),
        ]);
    }

    public function completed()
    {
        return $this->state([
            'contract_pdf' => fake()->url(),
            'status' => 'completed',
            'activated_at' => fake()->dateTimeBetween('-30 days', '-15 days'),
            'completed_at' => fake()->dateTimeBetween('-14 days', '-1 day'),
            'description' => fake()->paragraphs(rand(4, 7), true),
            'finalPrice' => fake()->randomFloat(2, 50, 10000),
            'finalDeadline' => fake()->dateTimeBetween('-30 days', '-1 day')->format('Y-m-d'),
        ]);
    }
}
