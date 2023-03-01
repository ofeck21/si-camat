<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesFamilyStructureResource extends JsonResource
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
            'family_status'     => new OptionsResource($this->familyStatus),
            'is_bpjs'           => $this->is_bpjs,
            'name'              => $this->name,
            'gender'            => new OptionsResource($this->jenisKelamin),
            'age'               => $this->age,
            'education'         => $this->education,
            'pendidikan'        => new OptionsResource($this->pendidikan),
            'position'          => $this->position,
            'company'           => $this->company,
        ];
        return parent::toArray($request);
    }
}
