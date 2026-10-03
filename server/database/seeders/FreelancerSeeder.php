<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Freelancer;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FreelancerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = User::where('role', 'freelancer')->get();
        $categories = Category::pluck('id');
        $skills = Skill::pluck('id');


        foreach ($users as $user) {
            $freelancer = Freelancer::factory()->create([
                'user_id' => $user->id,
                'category_id' => $categories->random()
            ]);

            $randomSkills = $skills->random(rand(3, 10));
            $freelancer->skills()->attach($randomSkills);
        }

    }
}
