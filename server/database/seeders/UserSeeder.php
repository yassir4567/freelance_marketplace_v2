<?php

namespace Database\Seeders;

use App\Models\Freelancer;
use App\Models\User;
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

        User::factory()->freelancer()->count(10)->create();
        User::factory()->client()->count(10)->create();
    }
}
