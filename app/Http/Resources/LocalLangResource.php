<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class LocalLangResource extends JsonResource
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
            // 'created_by'        => $this->created_by,
            // 'updated_by'        => $this->updated_by,
            'created_at'        => $this->created_at,
            'updated_at'        => $this->updated_at,

            'id'                => Crypt::encryptString($this->id),
            'company_id'        => Crypt::encryptString($this->company_id),
            "edit"              => 'y',
            "delete"            => ($this->id > 2) ? 'y' : 'n',
            'locale'            => $this->locale,
            'lable'             => $this->lable,
            'status'            => $this->status,
            'lang'              => LangResource::collection($this->lang)
        ];
    }
}
