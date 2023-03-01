<?php

namespace App\Http\Requests;

use App\Services\ResponseService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class MaterialRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->method() == "PUT" || $this->method() == "PATCH") {
            return [
                'name'      => 'required|unique:materials,name,id',
                'type'      => 'required|in:raw,ripe,ready',
                'stock'     => 'required|integer'
                ];
        }
        return [
            'name'      => 'required|unique:materials,name',
            'type'      => 'required|in:raw,ripe,ready',
            'stock'     => 'required|integer'
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json(ResponseService::validatorError($validator->errors()))
        );
    }
}
