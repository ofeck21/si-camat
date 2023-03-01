<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecruitmentFamilyStructureResource extends JsonResource
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
            'id'                    => $this->id,
            'recruitment_id'        => $this->recruitment_id,
            'structure'             => $this->structure,
            'name'                  => $this->name,
            'gender'                => $this->gender,
            'age'                   => $this->age,
            'education'             => $this->education,
            'position'              => $this->position,
            'company'               => $this->company,
            'pendidikan'            => new OptionsResource($this->pendidikan),
            'lp'                    => new OptionsResource($this->lp),
            'created_at'            => $this->created_at,
            'updated_at'            => $this->updated_at,
        ];
        return parent::toArray($request);
    }
}
