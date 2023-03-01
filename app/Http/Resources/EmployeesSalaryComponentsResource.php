<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesSalaryComponentsResource extends JsonResource
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
            'salary_component_id'   => $this->salary_component_id,
            'salary_component'      => new SalaryComponentsResource($this->salaryComponent),
            'employee_id'           => $this->employee_id,
            'month'                 => Carbon::parse($this->month)->locale('id')->format('M Y'),
            'month_ymd'             => $this->month,
            'name'                  => $this->name,
            'nominal'               => $this->nominal,
        ];
    }
}
