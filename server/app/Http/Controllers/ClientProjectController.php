<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

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
}
