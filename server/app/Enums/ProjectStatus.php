<?php

namespace App\Enums;

enum ProjectStatus: string
{
    case OPEN = "open";
    case IN_REVIEW = "in_review";
    case IN_PROGRESS = "in_progress";
    case CLOSED = "closed";
    case COMPLETED = "completed";
    case CANCELLED = "cancelled";
}
