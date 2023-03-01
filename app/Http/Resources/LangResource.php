<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Crypt;

class LangResource extends JsonResource
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
            'id'                => Crypt::encryptString($this->id),
            'local_lang_id'     => Crypt::encryptString($this->local_lang_id),
            'key'               => $this->key,
            'value'             => $this->value,
            // 'created_by'        => $this->created_by,
            // 'updated_by'        => $this->updated_by,
        ];
        // return parent::toArray($request);
    }
}
