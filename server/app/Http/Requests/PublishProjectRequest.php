<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PublishProjectRequest extends FormRequest
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
        $durationBySize = [
            'small' => [
                'less_than_1_month',
                '1_to_3_month',
                '3_to_6_month',
            ],

            'medium' => [
                '1_to_3_month',
                '3_to_6_month',
                'more_than_6_month',
            ],

            'large' => [
                '1_to_3_month',
                '3_to_6_month',
                'more_than_6_month',
            ],
        ];

        $size = $this->input('size');


        return [
            'title' => ['required', 'string', 'min:5', 'max:200'],
            'description' => ['required', 'string', 'min:300', 'max:3000'],
            'budget' => ['required', 'numeric', 'min:20'],
            'experienceLevel' => ['required', 'string', Rule::in(['junior', 'mid-level', 'senior'])],
            'size' => ['required', 'string', Rule::in(['small', 'medium', 'large'])],
            'duration' => ['required', 'string', Rule::in($durationBySize[$size] ?? [])],
            'category_id' => ['required', 'integer', 'exists:categories,id'],
            'skills' => ['required', 'array', 'min:1'],
            'skills.*' => ['required', 'integer', 'distinct', 'exists:skills,id']
        ];
    }
}
