<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecruitmentIdentificationCardResource extends JsonResource
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
            'id'                            => $this->id,
            'recruitment_id'                => $this->recruitment_id,
            'card_number'                   => $this->card_number,
            'validity_period'               => $this->validity_period,
            'is_drivers_license'            => $this->is_drivers_license,
            'type'                          => $this->type,
            
        ];
    }
}
