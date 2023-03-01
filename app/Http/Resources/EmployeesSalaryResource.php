<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
class EmployeesSalaryResource extends JsonResource
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
            'salary'                => new SalaryResource($this->salary),
            'month'                 => Carbon::parse($this->month)->locale('id')->format('M Y'),
            'month_ymd'             => $this->month,
            'name'                  => $this->name,
            'nominal'               => $this->nominal
        ];
        // return parent::toArray($request);
    }
}
