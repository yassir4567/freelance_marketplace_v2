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
            $table->string('description');
            $table->decimal('budget', 10, 2);
            $table->enum('status', ['OPEN', 'IN_REVIEW', 'IN_PROGRESS', 'COMPLETED', 'CLOSED']);
            $table->enum('experienceLevel', ['JUNIOR', 'MID-LEVEL', 'SENIOR']);
            $table->enum('size', ['SMALL', 'MEDIUM', 'LARGE']);
            $table->enum('duration', ['LESS_THAN_1_MONTH', '1_TO_3_MONTH', '3_TO_6_MONTH', 'MORE_THAN_6_MONTH']);

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
