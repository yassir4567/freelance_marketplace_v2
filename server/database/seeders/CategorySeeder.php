<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //

        Category::create(['name' => 'Web Development']);
        Category::create(['name' => 'UI/UX Disgner']);
        Category::create(['name' => 'Marketing']);
        Category::create(['name' => 'Video Editing']);
        Category::create(['name' => 'Graphic Designer']);
    }
}
