<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class EmployeesResource extends JsonResource
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
            'id'                    => Crypt::encryptString($this->id),
            'first_name'            => $this->first_name,
            'last_name'             => $this->last_name,
            'users'                 => new UsersResource($this->users),
            'id_card'               => $this->id_card,
            'national_number'       => $this->national_number,
            'employee_id_number'    => $this->employee_id_number,
            'mobile_phone'          => $this->mobile_phone,
            'phone'                 => $this->phone,
            'original_address'      => $this->original_address,
            'current_address'       => $this->current_address,
            'country'               => new CountriesResource($this->country),
            'province'              => $this->province,
            'city'                  => $this->city,
            'zip_code'              => $this->zip_code,
            'date_of_birth'         => $this->date_of_birth,
            'gender'                => new OptionsResource($this->gender),
            'marital_status'        => new OptionsResource($this->maritalStatus),
            'religion'              => new OptionsResource($this->religion),
            'company'               => new CompaniesResource($this->company),
            'department'            => new DepartmentsResource($this->department),
            'job_position'          => new JobPositionsResource($this->jobPosition),
            'job_levels'            => new JobLevelResource($this->jobLevel),
            'shift'                 => new EmployeesShiftResource($this->empShift),

            'employee_status'       => new OptionsResource($this->employeesStatus),
            'employee_work_status'  => new EmployeesStatusResource($this->employeesWorkStatus),
            'employment_status'     => new OptionsResource($this->employmentStatus),
            'employee_category'     => new EmployeesStatusResource($this->employeesCategory),
            'date_of_joining'       => $this->date_of_joining,
            'date_of_leaving'       => $this->date_of_leaving,
            'blood_group_id'        => new OptionsResource($this->bloodGroup),
            'photo'                 => $this->photo,
            'tribes'                => $this->tribes,
            'social_profile'        => EmployeesSocialProfileResource::collection($this->socialProfile),
            'created_by'            => new UsersResource($this->createdBy),
            'updated_by'            => new UsersResource($this->updatedBy),
            'created_at'            => $this->created_at,
            'updated_at'            => $this->updated_at,
        ];
    }
}
