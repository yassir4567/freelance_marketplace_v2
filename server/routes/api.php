<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientDashboard;
use Illuminate\Support\Facades\Route;

Route::post("/login", [AuthController::class, 'login']);
Route::post("/register", [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::middleware('role:client')->group(function () {
        Route::get('/client/dashboard/stats', [ClientDashboard::class, 'stats']);
    });
});
