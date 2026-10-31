<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\User\FreelancerSummaryResource;
use App\Http\Resources\User\UserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $proposal = $this->relationLoaded('proposals') ? $this->proposals->first() : null;

        return [
            'id' => $this->id,
            'title' => $this->title,
            'status' => $this->status,
            'budget' => $this->budget,
            'publishedAt' => $this->created_at,
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'deadline' => $this->when(
                $proposal?->contract !== null,
                fn() => $proposal->contract->finalDeadline
            ),
            'freelancer' => $this->when(
                $proposal?->contract !== null,
                fn() => new UserResource($proposal->freelancer->user)
            )
        ];
    }
}
