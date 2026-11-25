<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
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
        $user = $this->user();
        return [
            'firstName' => ['required', 'string', 'min:2'],
            'lastName' => ['required', 'string', 'min:2'],
            'phone' => ['required', 'string', "min:1"],
            'country' => ['required', 'string', "min:3"],
            'city' => ['required', 'string', "min:3"],
            'avatar' => [Rule::requiredIf(fn() => !$user->avatar), File::image()->types(['jpeg', 'png', 'jpg', 'webp'])->max('3MB')]
        ];
    }
}
