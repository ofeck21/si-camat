<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Cache\Store;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class ReqruitmentResource extends JsonResource
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
            'fullname'              => $this->fullname,
            'place_of_birth'        => $this->place_of_birth,
            'date_of_birth'         => $this->date_of_birth,
            'gender'                => $this->gender,
            'mobile_phone_number'   => $this->mobile_phone_number,
            'phone_number'          => $this->phone_number,
            'email'                 => $this->email,
            'id_card_address'       => $this->id_card_address,
            'residence_address'     => $this->residence_address,
            'marital_status'        => $this->marital_status,
            'created_at'            => $this->created_at,
            'updated_at'            => $this->updated_at,
            'nik'                   => $this->nik,
            'file_nik'              => Storage::url($this->file_nik),
            'no_kk'                 => $this->no_kk,
            'file_no_kk'            => Storage::url($this->file_no_kk),
            'no_skck'               => $this->no_skck,
            'file_no_skck'          => Storage::url($this->file_no_skck),
            'status'                => $this->status,
            'posisi_dilamar'        => $this->posisi_dilamar,

            'religion'              => new OptionsResource($this->agama),
            'tribes'                => $this->tribes,
            'citizenship'           => $this->citizenship,
            'blood_group'           => new OptionsResource($this->blood),
            'height'                => $this->height,
            'width'                 => $this->width,
            'glasses'               => $this->glasses,
            'question1'             => $this->question1,
            'question2'             => $this->question2,

            'salary'                => new RecruitmentSalaryResource($this->salary),
            'referensi'             => RecruitmentReferensiResource::collection($this->referensi),
            'card'                  => RecruitmentIdentificationCardResource::collection($this->card),
            'family'                => RecruitmentFamilyStructureResource::collection($this->family),
            'education'             => RecruitmentFormalEducationResource::collection($this->education),
            'history'               => RecruitmentEmploymentHistoryResource::collection($this->history),
            'training'              => RecruitmentTrainingResource::collection($this->training),
            'certificate'           => RecruitmentCertificateResource::collection($this->certificate),
            'language'              => RecruitmentLanguageResource::collection($this->language),
            'social'                => RecruitmentSocialActivitiesResource::collection($this->social),
            'leisure'               => RecruitmentLeisureActivitiesResource::collection($this->leisure),
            'gender'                => new OptionsResource($this->lp),
            'photos'                => RecruitmentPhotoResource::collection($this->photos)
        ];
    }
}
