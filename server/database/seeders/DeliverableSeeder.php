<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Deliverable;
use Illuminate\Database\Seeder;

class DeliverableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $contracts = Contract::whereNotIn('status', ['pending', 'rejected'])->get();

        foreach ($contracts as $contract) {
            if ($contract->status == 'awaiting_freelancer_accept') {
                $totalDeliverables = rand(1, 5);
                $position = 0;
                Deliverable::factory()
                    ->pending()
                    ->count($totalDeliverables)
                    ->sequence(function () use (&$position) {
                        return [
                            'position' => ++$position
                        ];
                    })
                    ->create([
                        'contract_id' => $contract->id,
                        'amount' => $contract->finalPrice / $totalDeliverables,
                    ]);
            }

            if ($contract->status == 'completed') {
                $totalDeliverables = rand(1, 5);
                $position = 0;
                Deliverable::factory()
                    ->accepted()
                    ->count($totalDeliverables)
                    ->sequence(function () use (&$position) {
                        return [
                            'position' => ++$position
                        ];
                    })->create([
                            'contract_id' => $contract->id,
                            'amount' => $contract->finalPrice / $totalDeliverables,

                        ]);
            }

            if ($contract->status == 'active') {
                $totalDeliverables = rand(2, 5);
                $position = 0;

                $acceptedCount = rand(0, $totalDeliverables - 1);
                $currentStatus = fake()->randomElement(['unlocked', 'submitted', 'revision_request', 'pending']);

                Deliverable::factory()
                    ->accepted()
                    ->count($acceptedCount)
                    ->sequence(function () use (&$position) {
                        return [
                            'position' => ++$position
                        ];
                    })
                    ->create([
                        'contract_id' => $contract->id,
                        'amount' => $contract->finalPrice / $totalDeliverables,
                    ]);

                if ($currentStatus == 'unlocked') {
                    Deliverable::factory()
                        ->unlocked()
                        ->sequence(function () use (&$position) {
                            return [
                                'position' => ++$position
                            ];
                        })
                        ->create([
                            'contract_id' => $contract->id,
                            'amount' => $contract->finalPrice / $totalDeliverables,

                        ]);
                } else if ($currentStatus == 'submitted') {
                    Deliverable::factory()
                        ->submitted()
                        ->sequence(function () use (&$position) {
                            return [
                                'position' => ++$position
                            ];
                        })
                        ->create([
                            'contract_id' => $contract->id,
                            'amount' => $contract->finalPrice / $totalDeliverables,
                        ]);
                } else if ($currentStatus == 'revision_request') {
                    Deliverable::factory()
                        ->revision_request()
                        ->sequence(function () use (&$position) {
                            return [
                                'position' => ++$position
                            ];
                        })
                        ->create([
                            'contract_id' => $contract->id,
                            'amount' => $contract->finalPrice / $totalDeliverables,
                        ]);
                } else {
                    Deliverable::factory()
                        ->pending()
                        ->sequence(function () use (&$position) {
                            return [
                                'position' => ++$position
                            ];
                        })
                        ->create([
                            'contract_id' => $contract->id,
                            'amount' => $contract->finalPrice / $totalDeliverables,
                        ]);
                }

                Deliverable::factory()
                    ->pending()
                    ->sequence(function () use (&$position) {
                        return [
                            'position' => ++$position
                        ];
                    })
                    ->count($totalDeliverables - $acceptedCount - 1)
                    ->create([
                        'contract_id' => $contract->id,
                        'amount' => $contract->finalPrice / $totalDeliverables,
                    ]);

            }
        }
    }
}
