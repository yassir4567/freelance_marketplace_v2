<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Freelancer;
use App\Models\User;
use DB;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();

        $user = User::where('email', $credentials['email'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }

        $user->tokens()->delete();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'User authenticated successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'email' => $user->email,
                    'role' => $user->role,
                ],
                'token' => $token
            ]
        ], 200);
    }


    public function register(RegisterRequest $request)
    {
        $validated = $request->validated();

        $transactionResult = DB::transaction(function () use ($validated) {
            $user = User::create([
                'firstName' => $validated['firstName'],
                'lastName' => $validated['lastName'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'role' => $validated['role']
            ]);

            if ($validated['role'] == 'freelancer') {
                Freelancer::create([
                    'user_id' => $user->id
                ]);
            }
            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'user' => $user,
                'token' => $token
            ];
        });


        return response()->json([
            'message' => 'User registred successfully',
            'data' => [
                'user' => [
                    'id' => $transactionResult['user']->id,
                    'firstName' => $transactionResult['user']->firstName,
                    'lastName' => $transactionResult['user']->lastName,
                    'email' => $transactionResult['user']->email,
                    'role' => $transactionResult['user']->role,
                ],
                'token' => $transactionResult['token']
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json([
            'message' => 'User logged out successfully'
        ]);
    }


    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'message' => 'User retreived successfully',
            'data' => [
                'user' => [
                    'id' => $user->id,
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'email' => $user->email,
                    'role' => $user->role,
                ]
            ]
        ]);
    }
}
