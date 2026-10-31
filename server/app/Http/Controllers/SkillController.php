<?php

namespace App\Http\Controllers;

use App\Http\Resources\SkillResource;
use App\Models\Skill;

class SkillController extends Controller
{
    public function index()
    {
        $skills = Skill::select('id', 'name')->get();

        return SkillResource::collection($skills)->additional([
            'success' => true,
            'message' => 'Skills retreived successefully',
        ]);
    }
}
