<?php

namespace App\Enums;

enum ContractStatus: string
{
    case PENDING = "pending";
    case AWAITING_FREELANCER_ACCEPT = "awaiting_freelancer_accept";
    case ACTIVE = "active";
    case COMPLETED = "completed";
    case REJECTED = "rejected";
    case CANCELLED = "cancelled";
}
