<?php

namespace App\Http\Controllers;

use App\Models\Skill;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::select('id', 'name')->get();

        return response()->json([
            'success' => true,
            'message' => 'Skills retreived successefully',
            'data' => $skills
        ]);
    }
}
