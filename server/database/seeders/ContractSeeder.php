<?php

namespace Database\Seeders;

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
        $proposals = Proposal::whereNotIn('status', ['pending', 'rejected'])->get();

        foreach ($proposals as $proposal) {
            if ($proposal->status == 'accepted') {
                Contract::factory()->pending()->create([
                    'proposal_id' => $proposal->id
                ]);
            }

            if ($proposal->status == 'revoked') {
                Contract::factory()->rejected()->create([
                    'proposal_id' => $proposal->id
                ]);
            }

            if ($proposal->status == 'contracted') {
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
