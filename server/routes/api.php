<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ClientProjectController;
use App\Http\Controllers\FreelancerDashboardController;
use App\Http\Controllers\SkillController;
use Illuminate\Support\Facades\Route;

Route::post("/login", [AuthController::class, 'login']);
Route::post("/register", [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('role:client')->group(function () {
        Route::prefix('client')->group(function () {
            Route::get('/dashboard', [ClientDashboardController::class, 'index']);
            Route::get("/projects", [ClientProjectController::class, 'index']);
            Route::get("/projects/{id}", [ClientProjectController::class, 'show']);
            Route::post("/projects", [ClientProjectController::class, 'store']);
            Route::put("/projects/{id}", [ClientProjectController::class, 'update']);
        });
    });

    Route::middleware('role:freelancer')->group(function () {
        Route::prefix('freelancer')->group(function () {
            Route::get('/dashboard', [FreelancerDashboardController::class, 'index']);
        });
    });

    Route::get("/categories", [CategoryController::class, 'index']);
    Route::get("/skills", [SkillController::class, 'index']);
});
