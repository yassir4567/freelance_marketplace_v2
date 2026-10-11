<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\FreelancerDashboardController;
use Illuminate\Support\Facades\Route;

Route::post("/login", [AuthController::class, 'login']);
Route::post("/register", [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('role:client')->group(function () {
        Route::get('/client/dashboard/stats', [ClientDashboardController::class, 'stats']);
    });

    Route::middleware('role:freelancer')->group(function () {
        Route::get('/freelancer/dashboard/stats', [FreelancerDashboardController::class, 'stats']);
    });
});
