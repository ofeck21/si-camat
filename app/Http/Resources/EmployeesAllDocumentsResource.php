<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesAllDocumentsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $response['id']                                  = $this->id;
        $response['document_type']                       = new OptionsResource($this->documentType);
        $response['document_title']                      = $this->document_title;
        $response['expiry_date']                         = $this->expiry_date;
        $response['description']                         = $this->description;
        $response['document_file']                       = $this->document_file;
        return $response;
    }
}
