<?php

namespace Database\Seeders;

use App\Models\Contract;
use App\Models\Conversation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ConversationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $contracts = Contract::all();

        foreach ($contracts as $contract) {
            Conversation::factory()->create([
                'contract_id' => $contract->id,
            ]);
        }
    }
}
