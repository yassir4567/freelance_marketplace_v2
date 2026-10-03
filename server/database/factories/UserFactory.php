<?php

namespace Database\Factories;

use App\Models\User;
use Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
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
            'email' => fake()->safeEmail(),
            'password' => Hash::make('12345678'),
            'firstName' => fake()->firstName(),
            'lastName' => fake()->lastName(),
            'phone' => fake()->phoneNumber(),
            'country' => fake()->country(),
            'address' => fake()->address(),
            'city' => fake()->city(),
        ];
    }

    public function client()
    {
        return $this->state([
            'role' => 'client'
        ]);
    }
    public function freelancer()
    {
        return $this->state([
            'role' => 'freelancer'
        ]);
    }
}
