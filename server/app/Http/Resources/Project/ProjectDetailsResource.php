<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\SkillResource;
use App\Http\Resources\User\FreelancerSummaryResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectDetailsResource extends JsonResource
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
            'description' => $this->description,
            'budget' => $this->budget,
            'status' => $this->status,
            'experienceLevel' => $this->experienceLevel,
            'size' => $this->size,
            'duration' => $this->duration,
            'publishedAt' => $this->created_at,
            'proposals_count' => $this->whenCounted('proposals'),
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
            'finalPrice' => $this->when(
                $proposal?->contract !== null,
                fn() => $proposal->contract->finalPrice
            ),
            'deadline' => $this->when(
                $proposal?->contract !== null,
                fn() => $proposal->contract->finalDeadline
            ),
            'freelancer' => $this->when(
                $proposal?->contract !== null,
                fn() => new FreelancerSummaryResource($proposal->freelancer)
            )
        ];
    }
}
