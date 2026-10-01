<?php

use Illuminate\Support\Facades\Route;

Route::get('/projects', function () {
    return response()->json([
        'message' => 'Hello from Laravel!',
        'projects' => [
            ['id' => 1, 'title' => 'Build a website'],
            ['id' => 2, 'title' => 'Create a mobile app'],
        ]
    ]);
});
