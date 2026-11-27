<?php

namespace App\Enums;

enum ProposalStatus: string
{
    case PENDING = "pending";
    case ACCEPTED = "accepted";
    case REJECTED = "rejected";
    case WITHDRAWN = "withdrawn";
    case DECLINED = "declined";
    case CONTRACTED = "contracted";
}
