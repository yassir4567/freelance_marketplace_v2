<?php

namespace Database\Factories;

use App\Models\Payment;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Payment>
 */
class PaymentFactory extends Factory
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

    public function escrow()
    {
        return $this->state([
            'status' => 'escrow'
        ]);
    }

    public function released()
    {
        return $this->state([
            'status' => 'released'
        ]);
    }
}
