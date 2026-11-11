<?php

namespace App\Policies;

use App\Enums\ProjectStatus;
use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function view(User $user, Project $project): Response
    {
        if ($project->client_id !== $user->id)
            return Response::denyAsNotFound();
        return Response::allow();
    }

    public function create(User $user): Response
    {
        if (!$user->getProfileCompelation()['isProfileCompleted']) {
            return Response::deny('client can\'t publish a project before completing his profile');
        }
        return Response::allow();
    }

    public function update(User $user, Project $project): Response
    {
        if ($project->client_id !== $user->id) {
            return Response::deny("Client can't update a project that doesn't belong to him");
        }
        if ($project->status !== ProjectStatus::OPEN) {
            return Response::deny("Client can't update a project that isn't open");
        }

        return Response::allow();
    }

    public function delete(User $user, Project $project): bool
    {
        return true;
    }


}
