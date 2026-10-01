<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->string('contract_pdf')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['PENDING', 'AWAITING_FREELANCER_ACCEPT', 'ACTIVE', 'COMPLETED', 'REJECTED']);
            $table->decimal('finalPrice', 10, 2)->nullable();
            $table->date('finalDeadline')->nullable();

            $table->timestamp('activated_at')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->foreignId('proposal_id')
                ->unique()
                ->constrained('proposals');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};
