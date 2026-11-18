<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

class UpdateClientProfileRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstName' => ['sometimes', 'required', 'string', 'min:2'],
            'lastName' => ['sometimes', 'required', 'string', 'min:2'],
            'phone' => ['sometimes', 'required', 'string'],
            'country' => ['sometimes', 'required', 'string'],
            'city' => ['sometimes', 'required', 'string'],
            'avatar' => ['sometimes', 'required', File::image()->types(['jpeg', 'png', 'jpg', 'webp'])->max('3MB')]
        ];
    }
}
