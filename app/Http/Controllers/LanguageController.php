<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use App\Http\Controllers\Controller;
use App\Models\LocalLang;

class LanguageController extends Controller
{
    // Switch Language
    public function switch($locale){
        LocalLang::where('id', '!=', null)->update(['status'=>'0']);
        $lang = LocalLang::find($locale);
        $lang->update(['status' => '1']);
        return redirect()->back();

        // available language in template array
        $availLocale=['en'=>'en', 'id'=>'id'];
        // check for existing language
        if(array_key_exists($locale,$availLocale)){
            session()->put('locale',$locale);
        }
        return redirect()->back();
    }
}