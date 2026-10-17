<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class UpdateProjectRequest extends FormRequest
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
            'title' => ['sometimes', 'string', 'min:5', 'max:200'],
            'description' => ['sometimes', 'string', 'min:300', 'max:3000'],
            'budget' => ['sometimes', 'numeric', 'min:20'],
            'experienceLevel' => ['sometimes', 'string', 'in:junior,mid-level,senior'],
            'size' => ['sometimes', 'string', 'in:small,medium,large'],
            'duration' => ['sometimes', 'string', 'in:less_than_1_month,1_to_3_month,3_to_6_month,more_than_6_month'],
            'category_id' => ['sometimes', 'integer', 'exists:categories,id'],
            'skills' => ['sometimes', 'array', 'min:1'],
            'skills.*' => ['integer', 'distinct', 'exists:skills,id']
        ];
    }
}
