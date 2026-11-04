<?php

namespace App\Enums;

enum PaymentStatus: string
{
    case ESCROW = "escrow";
    case RELEASED = "released";
}
