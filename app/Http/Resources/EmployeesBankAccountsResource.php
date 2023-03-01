<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeesBankAccountsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $response['id']                                = $this->id;
        $response['account_title']                     = $this->account_title;
        $response['account_number']                    = $this->account_number;
        $response['bank_name']                         = $this->bank_name;
        $response['bank_code']                         = $this->bank_code;
        $response['bank_branch']                       = $this->bank_branch;

        return $response;
    }
}
