<?php

namespace App\Http\Controllers;

use App\Http\Requests\PublishProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
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

        if ($request->query->has('title') && trim($request->query('title')) !== "") {
            $query->where('title', 'like', "%{$request->query('title')}%");
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
        ]);
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
            'category_id',
            'client_id'
        )->withCount('proposals')
            ->with([
                'category:id,name',
                'skills:id,name'
            ])->findOrFail($id);

        $this->authorize('view', $project);

        $data = [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'budget' => $project->budget,
            'status' => $project->status,
            'experienceLevel' => $project->experienceLevel,
            'size' => $project->size,
            'duration' => $project->duration,
            'proposalsCount' => $project->proposals_count,
            'category' => [
                'id' => $project->category->id,
                'name' => $project->category->name,
            ],
            'skills' => $project->skills->map(function ($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                ];
            })
        ];

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
        ]);
    }

    public function store(PublishProjectRequest $request)
    {
        $client = $request->user();
        $validated = $request->validated();

        $project = DB::transaction(function () use ($client, $validated) {
            $project = Project::create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'budget' => $validated['budget'],
                'experienceLevel' => $validated['experienceLevel'],
                'size' => $validated['size'],
                'duration' => $validated['duration'],
                'category_id' => $validated['category_id'],
                'client_id' => $client->id,
                'status' => 'open',
            ]);

            $project->skills()->attach($validated['skills']);

            return $project;
        });

        $project->load(['category:id,name', 'skills:id,name']);

        $project = [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'budget' => $project->budget,
            'status' => $project->status,
            'experienceLevel' => $project->experienceLevel,
            'size' => $project->size,
            'duration' => $project->duration,
            'category' => [
                'id' => $project->category->id,
                'name' => $project->category->name,
            ],
            'skills' => $project->skills->map(function ($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                ];
            })
        ];


        return response()->json([
            'success' => true,
            'message' => 'Project published successfully',
            'data' => $project
        ]);

    }

    public function update(UpdateProjectRequest $request, string $id)
    {
        $validated = $request->validated();
        $project = DB::transaction(function () use ($validated, $id) {
            $project = Project::whereKey($id)
                ->lockForUpdate()
                ->firstOrFail();

            $this->authorize('update', $project);

            $skillsProvided = array_key_exists('skills', $validated);
            $projectSkills = $validated['skills'] ?? [];

            $project->update($validated);

            if ($skillsProvided) {
                $project->skills()->sync($projectSkills);
            }

            return $project;
        });

        $project->load(['category:id,name', 'skills:id,name'])
            ->loadCount('proposals');

        $project = [
            'id' => $project->id,
            'title' => $project->title,
            'description' => $project->description,
            'budget' => $project->budget,
            'status' => $project->status,
            'experienceLevel' => $project->experienceLevel,
            'size' => $project->size,
            'duration' => $project->duration,
            'category' => [
                'id' => $project->category->id,
                'name' => $project->category->name,
            ],
            'skills' => $project->skills->map(function ($skill) {
                return [
                    'id' => $skill->id,
                    'name' => $skill->name,
                ];
            })
        ];

        return response()->json([
            'success' => true,
            'message' => "Project updated successfully",
            "data" => $project
        ]);
    }

}

