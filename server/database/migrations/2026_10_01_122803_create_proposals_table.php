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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->text('coverLetter');
            $table->enum('status', ['pending', 'accepted', 'rejected', 'revoked', 'contracted']);
            $table->string('proposedDuration');
            $table->decimal('proposedPrice', 10, 2);

            $table->foreignId('freelancer_id')->constrained('freelancers');
            $table->foreignId('project_id')->constrained('projects');

            $table->unique(['project_id', 'freelancer_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
