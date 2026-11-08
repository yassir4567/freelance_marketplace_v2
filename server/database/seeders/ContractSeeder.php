<?php

namespace Database\Seeders;

use App\Enums\ProjectStatus;
use App\Enums\ProposalStatus;
use App\Models\Contract;
use App\Models\Proposal;
use Illuminate\Database\Seeder;

class ContractSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $proposals = Proposal::whereNotIn('status', [ProposalStatus::PENDING, ProposalStatus::REJECTED])->get();

        foreach ($proposals as $proposal) {
            if ($proposal->status == ProposalStatus::ACCEPTED) {
                Contract::factory()->pending()->create([
                    'proposal_id' => $proposal->id
                ]);
            }

            if ($proposal->status == ProposalStatus::REVOKED) {
                Contract::factory()->rejected()->create([
                    'proposal_id' => $proposal->id
                ]);
            }

            if ($proposal->status == ProposalStatus::CONTRACTED) {
                if ($proposal->project->status == ProjectStatus::CANCELLED) {
                    Contract::factory()->cancelled()->create([
                        'proposal_id' => $proposal->id
                    ]);
                } else {
                    $num = rand(0, 1);
                    if ($num == 0) {
                        Contract::factory()->active()->create([
                            'proposal_id' => $proposal->id
                        ]);
                    } else {
                        Contract::factory()->completed()->create([
                            'proposal_id' => $proposal->id
                        ]);
                    }
                }
            }
        }

    }
}
