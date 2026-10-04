<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\User;
use Hash;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        User::factory()->freelancer()->create([
            'firstName' => 'yassir',
            'lastName' => 'laaouisset',
            'email' => 'yassir@gmail.com',
            'password' => Hash::make('20052005')
        ]);

        User::factory()->client()->create([
            'firstName' => 'brahim',
            'lastName' => 'laaouisset',
            'email' => 'brahim@gmail.com',
            'password' => Hash::make('20052005')
        ]);

        User::factory()->freelancer()->count(10)->create();
        User::factory()->client()->count(10)->create();
    }
}
