<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesImmigrationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'                        => $this->id,
            'employees_id'              => $this->employees_id,
            'document_type_id'          => $this->document_type_id,
            'document_type'             => new OptionsResource($this->documentType),
            'issue_by'                  => new UsersResource($this->issueBy),
            'issue_date'                => $this->issue_date,
            'country_id'                => $this->country_id,
            'document_number'           => $this->document_number,
            'expired_date'              => $this->expired_date,
            'review_date'               => $this->review_date,
            'document_file'             => $this->document_file,
            'created_at'                => $this->created_at,
            'updated_at'                => $this->updated_at,
        ];
    }
}
