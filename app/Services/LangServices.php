<?php
namespace App\Services;

use App\Http\Resources\LocalLangResource;
use App\Models\Lang;
use App\Models\LocalLang;
use App\ResponseServices\ResponseService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class LangServices
{
    protected $localLangModel,
              $lang;

    public function __construct() {
        $this->localLangModel = new LocalLang();
        $this->lang = new Lang();
    }

    public function getAll()
    {
        $localLang = $this->localLangModel->get();
        return ResponseService::toArray(LocalLangResource::collection($localLang)->toJson());
    }

    public function updateData($id)
    {
        $id = Crypt::decryptString($id);
        $c = $this->lang->find($id);
        $c->update(['value' => request()->value]);
        return $c;
    }

    public function setActiveLanguage()
    {
        $id = Crypt::decryptString(request()->id);
        LocalLang::where('status', '1')->update(['status'=>'0']);
        LocalLang::find($id)->update(['status' => '1']);
        return true;
    }

    public function updateLanguage($request)
    {
        $id = Crypt::decryptString(request()->id);
        $update = LocalLang::find($id);
        $update->update(['locale' => $request->locale, 'lable' => $request->language]);
        return $update;
    }

    public function deleteLanguage($request)
    {
        $id = Crypt::decryptString(request()->id);
        $delete = LocalLang::find($id);

        Lang::where('local_lang_id', $delete->id)->delete();
        $delete->delete();

        return $delete;
    }


    public function addLanguage($request)
    {
        try {
            DB::beginTransaction();

            $payload['company_id'] = auth()->user()->company_id;
            $payload['locale'] = $request->locale;
            $payload['lable'] = $request->language;
            $payload['status'] = '0';
            $parent = LocalLang::create($payload);
            
            $default = LocalLang::first()->id;
            if ($request->default) {
                $default = Crypt::decryptString($request->default);
            }

            $lang = Lang::where('local_lang_id', $default)->get();
            foreach ($lang as $key => $item) {
                $dataLang = [
                    'local_lang_id'     => $parent->id,
                    'key'               => $item->key,
                    'value'             => ($request->default) ? $item->value: "",
                ];
                Lang::create($dataLang);
            }
            
            DB::commit();
            return $parent;
        } catch (\Throwable $th) {
            DB::rollBack();
        }
    }
}