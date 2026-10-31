<?php

namespace App\Http\Resources\Project;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\SkillResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
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
            'category' => CategoryResource::make($this->whenLoaded('category')),
            'skills' => SkillResource::collection($this->whenLoaded('skills')),
        ];
    }
}
