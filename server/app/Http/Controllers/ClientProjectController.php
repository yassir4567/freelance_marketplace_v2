<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublishProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class ClientProjectController extends Controller
{
    public function index(Request $request)
    {
        $client = $request->user();

        $query = Project::where('client_id', $client->id)
            ->select('id', 'title', 'budget', 'status', 'created_at', 'category_id')
            ->with([
                'proposals' => function ($query) {
                    return $query->where('status', 'contracted')->select('id', 'freelancer_id', 'project_id');
                },
                'proposals.contract:id,proposal_id,finalPrice,finalDeadline',
                'proposals.freelancer:id,user_id',
                'proposals.freelancer.user:id,firstName,lastName,avatar',
                'category:id,name'
            ]);

        if ($request->query->has('search') && trim($request->query('search')) !== "") {
            $query->where('title', 'like', "%{$request->query('search')}%");
        }

        if ($request->query->has('status') && trim($request->query('status')) !== "") {
            $query->where('status', $request->query('status'));
        }

        if ($request->query->has('sort') && trim($request->query('sort')) !== "") {
            $sort = $request->query('sort');
            if ($sort == 'newest') {
                $query->latest();
            } else if ($sort == 'oldest') {
                $query->oldest();
            }
        }

        $projects = $query->get()->map(function ($project) {
            $budget = null;
            $deadline = null;
            $freelancer = null;

            if (in_array($project->status, ['open', 'in_review'])) {
                $budget = $project->budget;
            } else {
                $proposal = $project->proposals->first();
                $contract = $proposal->contract;
                $freelancer = $proposal->freelancer;
                $user = $proposal->freelancer->user;

                $budget = $contract->finalPrice;
                $deadline = $contract->finalDeadline;
                $freelancer = [
                    'id' => $freelancer->id,
                    'user_id' => $user->id,
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'avatar' => $user->avatar,
                ];
            }

            $data = [
                'id' => $project->id,
                'title' => $project->title,
                'status' => $project->status,
                'budget' => (int) $budget,
                'publishedAt' => $project->created_at,
                'category' => $project->category,
            ];

            if ($deadline !== null) {
                $data['deadline'] = $deadline;
            }

            if ($freelancer !== null) {
                $data['freelancer'] = $freelancer;
            }

            return $data;
        });


        return response()->json([
            'success' => true,
            'message' => "Projects retreived successfully",
            'data' => $projects
        ], 200);
    }

    public function show(string $id)
    {
        $project = Project::select(
            'id',
            'title',
            'description',
            'budget',
            'status',
            'experienceLevel',
            'size',
            'duration',
            'created_at',
            'category_id',
            'client_id'
        )->withCount('proposals')
            ->with([
                'category:id,name',
                'skills:id,name'
            ])->findOrFail($id);

        $this->authorize('view', $project);

        $data = (new ProjectResource($project))->resolve();

        $isProjectHasContract = in_array($project->status, ['in_progress', 'completed']);

        if ($isProjectHasContract) {
            $project->load([
                'proposals' => function ($query) {
                    return $query->where('status', 'contracted')->select('id', 'project_id', 'freelancer_id');
                },
                'proposals.freelancer:id,title,user_id',
                'proposals.freelancer.user:id,firstName,lastName,avatar',
                'proposals.contract:id,finalPrice,finalDeadline,proposal_id'
            ]);

            $contract = $project->proposals->first()->contract;
            $freelancer = $project->proposals->first()->freelancer;
            $data['finalPrice'] = $contract->finalPrice;
            $data['deadline'] = $contract->finalDeadline;
            $data['freelancer'] = [
                'id' => $freelancer->id,
                'user_id' => $freelancer->user->id,
                'title' => $freelancer->title,
                'firstName' => $freelancer->user->firstName,
                'lastName' => $freelancer->user->lastName,
                'avatar' => $freelancer->user->avatar
            ];
        }

        return response()->json([
            'success' => true,
            'message' => 'Project retreived successfully',
            'data' => $data
        ], 200);
    }

    public function store(PublishProjectRequest $request)
    {
        $client = $request->user();
        $validated = $request->validated();


        $project = DB::transaction(function () use ($client, $validated) {
            $projectData = Arr::only($validated, [
                'title',
                'description',
                'budget',
                'experienceLevel',
                'size',
                'duration',
                'category_id',
            ]);
            $project = Project::create([
                ...$projectData,
                'client_id' => $client->id,
                'status' => 'open',
            ]);

            $project->skills()->attach($validated['skills']);

            return $project;
        });

        $project->load(['category:id,name', 'skills:id,name']);


        return (new ProjectResource($project))->additional([
            'success' => true,
            'message' => 'Project published successfully',
        ])->response()->setStatusCode(201);
    }

    public function update(UpdateProjectRequest $request, string $id)
    {
        $validated = $request->validated();

        $transaction = DB::transaction(function () use ($validated, $id) {
            $project = Project::whereKey($id)
                ->lockForUpdate()
                ->firstOrFail();

            $this->authorize('update', $project);

            $skillsProvided = array_key_exists('skills', $validated);
            $projectSkills = $validated['skills'] ?? [];

            unset($validated['skills']);

            $project->fill($validated);

            $isProjectChanged = $project->isDirty();

            if ($skillsProvided) {
                $currentSkillsIds = $project->skills()
                    ->pluck('skills.id')
                    ->map(fn($id) => (int) $id)
                    ->sort()
                    ->values()
                    ->all();

                $newSkillsIds = collect($projectSkills)
                    ->map(fn($id) => (int) $id)
                    ->sort()
                    ->values()
                    ->all();

                $isSkillsChanged = $currentSkillsIds !== $newSkillsIds;
            } else {
                $isSkillsChanged = false;
            }

            if (!$isProjectChanged && !$isSkillsChanged) {
                return ['updated' => false];
            }

            if ($isProjectChanged) {
                $project->save();
            }

            if ($skillsProvided && $isSkillsChanged) {
                $project->skills()->sync($projectSkills);
            }

            return ['updated' => true, 'project' => $project];
        });

        if (!$transaction['updated']) {
            return response()->json([
                'success' => false,
                'message' => "No changes detected"
            ], 422);
        }

        $project = $transaction['project'];

        $project->load(['category:id,name', 'skills:id,name'])
            ->loadCount('proposals');

        return (new ProjectResource($project))->additional([
            'success' => true,
            'message' => 'Project updated successfully',
        ]);
    }

}

