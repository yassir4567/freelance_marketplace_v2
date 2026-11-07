<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, HasApiTokens;


    protected $fillable = [
        'email',
        'password',
        'role',
        'firstName',
        'lastName',
        'phone',
        'country',
        'city',
        'avatar',
    ];

    public function freelancer(): HasOne
    {
        return $this->hasOne(Freelancer::class);
    }

    public function projects(): HasMany
    {
        return $this->hasMany(Project::class, 'client_id');
    }

    public function sentMessages()
    {
        return $this->hasMany(Message::class, 'sender_id');
    }

    public function receivedMessages()
    {
        return $this->hasMany(Message::class, 'receiver_id');
    }

    public function getProfileCompelation()
    {
        if ($this->role === 'client') {
            return $this->getClientProfileCompelation();
        } else if ($this->role === 'freelancer') {
            return $this->getFreelancerProfileCompelation();
        }
        return [
            'percentage' => 100,
            'isProfileCompleted' => true,
            'missingFields' => [],
        ];
    }

    public function getClientProfileCompelation()
    {
        $fields = [
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
            'phone' => $this->phone,
            'country' => $this->country,
            'city' => $this->city,
            'avatar' => $this->avatar,
        ];

        return $this->calcProfileCompelation($fields);
    }

    public function getFreelancerProfileCompelation()
    {
        $freelancer = $this->freelancer;

        $fields = [
            'firstName' => $this->firstName,
            'lastName' => $this->lastName,
            'email' => $this->email,
            'phone' => $this->phone,
            'country' => $this->country,
            'city' => $this->city,
            'avatar' => $this->avatar,
            'bio' => $freelancer->bio,
            'title' => $freelancer->title,
            'portfolio_url' => $freelancer->portfolio_url,
            'category_id' => $freelancer->category_id,
            'yearsOfExperience' => $freelancer->yearsOfExperience,
            'skills' => $freelancer->skills()->exists()
        ];

        return $this->calcProfileCompelation($fields);
    }

    public function calcProfileCompelation($fields)
    {
        $totalFields = count($fields);
        $completed = 0;
        $missing_fields = [];

        foreach ($fields as $name => $value) {
            if ($value) {
                $completed++;
            } else {
                $missing_fields[] = $name;
            }
        }

        $percentage = round(($completed / $totalFields) * 100);

        return [
            'percentage' => $percentage,
            'isProfileCompleted' => $completed === $totalFields,
            'missingFields' => $missing_fields
        ];
    }
}
