<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;

class FreelancerDashboardController extends Controller
{
    public function stats(Request $request)
    {
        $user = $request->user();
        $freelancer = $user->freelancer;

        $totalProjects = Contract::whereIn('status', ['active', 'completed'])
            ->whereHas('proposal', function ($query) use ($freelancer) {
                return $query->where('freelancer_id', $freelancer->id);

            })->count();

        $activeContracts = Contract::where('status', 'active')
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

        return response()->json([
            'message' => "Stats retrieved successfully",
            'data' => [
                'stats' => [
                    'totalProjects' => $totalProjects,
                    'activeContracts' => $activeContracts,
                    'totalEarnings' => (float) $totalEarnings,
                    'escrowPayments' => (float) $escrowPayments,
                ]
            ]
        ], 200);
    }
}
