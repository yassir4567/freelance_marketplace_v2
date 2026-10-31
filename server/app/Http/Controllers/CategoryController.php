<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::select('id', 'name')->get();

        return CategoryResource::collection($categories)->additional([
            'success' => true,
            'message' => 'Categories retreived successefully',
        ]);
    }
}
