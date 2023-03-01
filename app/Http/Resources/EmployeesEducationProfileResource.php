<?php

namespace App\Http\Resources;

use App\Models\Option;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesEducationProfileResource extends JsonResource
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
            'school_type'               => $this->school_type,
            'school_level'              => new OptionsResource($this->schoolLevel),
            'school_name'               => $this->school_name,
            'city'                      => $this->city,
            'start'                     => $this->start,
            'finish'                    => $this->finish,
            'graduated'                 => $this->graduated,
            'created_by'                => $this->created_by,
            'updated_by'                => $this->updated_by,
        ];
    }
}
