<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
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
            'company_id'            => $this->company_id,
            'name'                  => $this->name,
            'allow_overtime'        => $this->allow_overtime,
            'overtime_limit'        => $this->overtime_limit,
            'created_by'            => $this->created_by,
            'updated_by'            => $this->updated_by,
            'created_at'            => $this->created_at,
            'updated_at'            => $this->updated_at,
            'shift_times'           => shiftTimesResource::collection($this->shiftTimes)
        ];
        return parent::toArray($request);
    }
}
