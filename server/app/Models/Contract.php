<?php

namespace App\Models;

use App\Enums\ContractStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Contract extends Model
{
    use HasFactory;

    const CREATED_AT = 'createdAt';


    protected $fillable = [
        'contract_pdf',
        'description',
        'status',
        'finalPrice',
        'finalDeadline',
        'activated_at',
        'completed_at',
        'cancelled_at',
        'proposal_id',
    ];


    protected function casts()
    {
        return [
            'finalPrice' => 'decimal:2',
            'status' => ContractStatus::class
        ];
    }

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class);
    }

    public function deliverables(): HasMany
    {
        return $this->hasMany(Deliverable::class);
    }

    public function conversation(): HasOne
    {
        return $this->hasOne(Conversation::class);
    }

}
