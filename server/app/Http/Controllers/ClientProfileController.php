<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateClientProfileRequest;
use App\Http\Resources\Profile\ClientProfileResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

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
        $oldAvatar = $client->avatar;

        if ($request->hasFile('avatar')) {
            $validated['avatar'] = $request->file('avatar')->store('profiles', 'public');
        }

        $client->update($validated);

        if (
            isset($validated['avatar'])
            && $oldAvatar
            && Storage::disk('public')->exists($oldAvatar)
        ) {
            Storage::disk('public')->delete($oldAvatar);
        }

        return (new ClientProfileResource($client))->additional([
            'success' => true,
            'message' => 'Client profile updated successfully',
        ]);
    }
}
