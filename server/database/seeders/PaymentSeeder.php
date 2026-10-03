<?php

namespace Database\Seeders;

use App\Models\Deliverable;
use App\Models\Payment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $deliverables = Deliverable::where('status', '!=', 'pending')->get();

        foreach ($deliverables as $deliverable) {
            if (in_array($deliverable->status, ['unlocked', 'submitted', 'revision_request'])) {
                Payment::factory()->escrow()->create([
                    'amount' => $deliverable->amount,
                    'deliverable_id' => $deliverable->id
                ]);
            }
            if ($deliverable->status == 'accepted') {
                Payment::factory()->released()->create([
                    'amount' => $deliverable->amount,
                    'deliverable_id' => $deliverable->id
                ]);
            }
        }
    }

}
