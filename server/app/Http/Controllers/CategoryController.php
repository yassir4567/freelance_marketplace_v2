<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::select('id', 'name')->get();

        return response()->json([
            'success' => true,
            'message' => 'Categories retreived successefully',
            'data' => $categories
        ]);
    }
}
