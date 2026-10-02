<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Deliverable extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'amount',
        'deadline',
        'deliverable_links',
        'status',
        'unlocked_at',
        'submitted_at',
        'accepted_at',
        'revision_request_at',
        'submission_note',
        'position',
        'contract_id',
    ];

    protected function casts()
    {
        return [
            'deliverable_links' => 'array',
            'amount' => 'decimal:2'
        ];
    }

    public function contract(): BelongsTo
    {
        return $this->belongsTo(Contract::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }
}
