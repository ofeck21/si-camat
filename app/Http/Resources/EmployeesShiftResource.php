<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesShiftResource extends JsonResource
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
            'shift_id'                  => $this->shift_id,
            'employees_id'              => $this->employees_id,
            'status'                    => $this->status,
            'created_at'                => $this->created_at,
            'updated_at'                => $this->updated_at,
            'created_by'                => $this->created_by,
            'updated_by'                => $this->updated_by,
            'shift'                     => new ShiftResource($this->shift)
        ];
        return parent::toArray($request);
    }
}
