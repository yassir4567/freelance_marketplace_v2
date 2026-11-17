<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateClientProfileRequest;
use App\Http\Resources\Profile\ClientProfileResource;
use Illuminate\Http\Request;

class ClientProfileController extends Controller
{

    public function show(Request $request)
    {
        $client = $request->user();

        return (new ClientProfileResource($client))->additional([
            'success' => true,
            'message' => "Client profile retreived successfully"
        ]);
    }

    public function update(UpdateClientProfileRequest $request)
    {
        $client = $request->user();
        $validated = $request->validated();

        $client->update($validated);

        return (new ClientProfileResource($client))->additional([
            'success' => true,
            'message' => 'Client profile updated successfully',
        ]);
    }
}
