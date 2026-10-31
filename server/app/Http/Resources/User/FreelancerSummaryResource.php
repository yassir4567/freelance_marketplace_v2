<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FreelancerSummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->user->id,
            'firstName' => $this->user->firstName,
            'lastName' => $this->user->lastName,
            'avatar' => $this->user->avatar,
            'title' => $this->title
        ];
    }
}
