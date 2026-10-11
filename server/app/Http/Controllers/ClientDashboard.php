<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use App\Models\Project;
use Illuminate\Http\Request;

class ClientDashboard extends Controller
{
    // total projects
    // total active projects (active contracts) 
    // completed projects
    // freelances he worked with
    // total amount 
    // 
    public function stats(Request $request)
    {
        $client = $request->user();

        $totalProjects = $client->projects()->count();

        $activeContracts = Contract::where('status', 'active')
            ->whereHas('proposal.project', function ($query) use ($client) {
                return $query->where('client_id', $client->id);
            })->count();

        $completedProjects = $client->projects()->where('status', 'completed')->count();

        $hiredFreelancers = Contract::join('proposals', 'proposals.id', '=', 'contracts.proposal_id')
            ->join('projects', 'projects.id', '=', 'proposals.project_id')
            ->where('projects.client_id', $client->id)
            ->whereIn('contracts.status', ['active', 'completed'])
            ->distinct()
            ->count('proposals.freelancer_id');

        $totalSpending = Payment::where('status', 'released')
            ->whereHas('deliverable.contract.proposal.project', function ($query) use ($client) {
                return $query->where('client_id', $client->id);
            })->sum('amount');

        return response()->json([
            'message' => "Stats retrieved successfully",
            'data' => [
                'stats' => [
                    'totalProjects' => $totalProjects,
                    'activeContracts' => $activeContracts,
                    'completedProjects' => $completedProjects,
                    'hiredFreelancers' => $hiredFreelancers,
                    'totalSpending' => (float) $totalSpending,
                ]
            ]
        ], 200);

    }
}
