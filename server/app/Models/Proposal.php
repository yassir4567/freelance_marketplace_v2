<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Proposal extends Model
{
    use HasFactory;

    protected $fillable = [
        'coverLetter',
        'status',
        'proposedDuration',
        'proposedPrice',
        'freelancer_id',
        'project_id',
    ];

    protected function casts()
    {
        return [
            'proposedPrice' => 'decimal:2'
        ];
    }

    public function freelancer(): BelongsTo
    {
        return $this->belongsTo(Freelancer::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function contract(): HasOne
    {
        return $this->hasOne(Contract::class);
    }
}
