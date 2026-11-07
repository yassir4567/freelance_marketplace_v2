<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateClientProfileRequest;
use App\Http\Resources\User\UserSummaryResource;

class ClientProfileController extends Controller
{
    public function update(UpdateClientProfileRequest $request)
    {
        $client = $request->user();
        $validated = $request->validated();

        $client->update($validated);

        return (new UserSummaryResource($client))->additional([
            'success' => true,
            'message' => 'Client profile updated successfully',
        ]);
    }
}
