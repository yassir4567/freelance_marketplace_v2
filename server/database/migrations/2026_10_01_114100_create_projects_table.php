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
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->decimal('budget', 10, 2);
            $table->enum('status', [
                'open',
                'in_review',
                'in_progress',
                'draft',
                'closed',
                'completed',
                'cancelled'
            ]);
            $table->enum('experienceLevel', ['junior', 'mid-level', 'senior']);
            $table->enum('size', ['small', 'medium', 'large']);
            $table->enum('duration', [
                'less_than_1_month',
                '1_to_2_month',
                '2_to_4_month',
                '4_to_6_month',
                '6_to_9_month',
                '9_to_10_month',
                '10_to_12_month',
                'more_than_1_year'
            ]);

            $table->foreignId('category_id')
                ->nullable()
                ->constrained('categories')
                ->nullOnDelete();

            $table->foreignId('client_id')->constrained('users');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
