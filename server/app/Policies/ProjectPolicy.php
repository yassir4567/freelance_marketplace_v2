<?php

namespace App\Policies;

use App\Models\Project;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class ProjectPolicy
{
    public function view(User $user, Project $project): bool
    {
        return $project->client_id === $user->id;
    }

    public function create(User $user): Response
    {
        if (!$user->getProfileCompelation()['isProfileCompleted']) {
            return Response::deny('client can\'t publish a project before completing his profile');
        }
        return Response::allow();
    }

    public function update(User $user, Project $project): bool
    {
        return $project->client_id === $user->id
            && $project->status === 'open'
            && $project->proposals()->count() === 0;
    }

    public function delete(User $user, Project $project): bool
    {
        return true;
    }


}
