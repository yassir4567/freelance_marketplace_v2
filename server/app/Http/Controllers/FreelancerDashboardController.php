<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;

class FreelancerDashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $freelancer = $user->freelancer;

        $totalProjects = Contract::whereIn('status', ['active', 'completed'])
            ->whereHas('proposal', function ($query) use ($freelancer) {
                return $query->where('freelancer_id', $freelancer->id);

            })->count();

        $countActiveContracts = Contract::where('status', 'active')
            ->whereHas('proposal', function ($query) use ($freelancer) {
                return $query->where('freelancer_id', $freelancer->id);
            })->count();

        $totalEarnings = Payment::where('status', 'released')
            ->whereHas('deliverable.contract.proposal', function ($query) use ($freelancer) {
                return $query->where('freelancer_id', $freelancer->id);
            })->sum('amount');

        $escrowPayments = Payment::where('status', 'escrow')
            ->whereHas('deliverable.contract.proposal', function ($query) use ($freelancer) {
                return $query->where('freelancer_id', $freelancer->id);
            })->sum('amount');

        $activeContracts = Contract::select("id", "proposal_id", "finalPrice", "finalDeadline")->where('status', 'active')
            ->whereHas('proposal', function ($query) use ($freelancer) {
                return $query->where('freelancer_id', $freelancer->id);
            })->with([
                    'proposal:id,project_id',
                    'proposal.project:id,client_id,title',
                    'proposal.project.client:id,firstName,lastName,avatar'
                ])
            ->latest()->take(3)->get()->map(function ($contract) {
                return [
                    'id' => $contract->id,
                    'price' => (float) $contract->finalPrice,
                    'deadline' => $contract->finalDeadline,
                    'title' => $contract->proposal->project->title,
                    'client' => [
                        'id' => $contract->proposal->project->client->id,
                        'firstName' => $contract->proposal->project->client->firstName,
                        'lastName' => $contract->proposal->project->client->lastName,
                        'avatar' => $contract->proposal->project->client->avatar,
                    ]
                ];
            });

        return response()->json([
            'message' => "Stats retrieved successfully",
            'data' => [
                'stats' => [
                    'totalProjects' => $totalProjects,
                    'countActiveContracts' => $countActiveContracts,
                    'totalEarnings' => (float) $totalEarnings,
                    'escrowPayments' => (float) $escrowPayments,
                ],
                'activeContracts' => $activeContracts
            ]
        ], 200);
    }
}
