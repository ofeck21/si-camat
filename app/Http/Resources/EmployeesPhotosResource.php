<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class EmployeesPhotosResource extends JsonResource
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
            'id'                => $this->id,
            'employees_id'      => $this->employees_id,
            'path'              => Storage::url($this->path),
            'created_at'        => $this->created_at,
            'updated_at'        => $this->updated_at,
            'created_by'        => $this->created_by,
            'updated_by'        => $this->updated_by,
        ];
        return parent::toArray($request);
    }
}
