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
        Schema::create('deliverables', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('amount', 10, 2);
            $table->date('deadline')->nullable();
            $table->json('deliverable_links')->nullable();
            $table->enum('status', ['pending', 'unlocked', 'submitted', 'accepted', 'revision_request']);
            $table->timestamp('unlocked_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('accepted_at')->nullable();
            $table->timestamp('revision_request_at')->nullable();
            $table->text('submission_note')->nullable();
            $table->integer('position');

            $table->foreignId('contract_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deliverables');
    }
};
