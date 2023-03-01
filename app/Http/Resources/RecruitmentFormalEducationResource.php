<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecruitmentFormalEducationResource extends JsonResource
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
            'recruitment_id'    => $this->recruitment_id,
            'school_level'      => $this->school_level,
            'school_name'       => $this->school_name,
            'city'              => $this->city,
            'start'             => $this->start,
            'finish'            => $this->finish,
            'graduated'         => $this->graduated,
            'created_at'        => $this->created_at,
            'updated_at'        => $this->updated_at,
            'tingkat'           => new OptionsResource($this->schoolLevel),
        ];
        
        return parent::toArray($request);
    }
}
