<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class RecruitmentPhotoResource extends JsonResource
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
            'type'              => $this->type,
            'path'              => Storage::url($this->path),
            'public_path'       => Storage::path($this->path),
            'created_at'        => $this->created_at,
            'updated_at'        => $this->updated_at,
        ];
        return parent::toArray($request);
    }
}
