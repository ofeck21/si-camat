<?php
use App\Models\LocalLang;
use Illuminate\Contracts\Database\Eloquent\Builder;

if (!function_exists('lang')) {
    function lang($key)
    {
        $callback = function ($query) use ($key) {
            $query->where('key', $key);
        };

        $q = LocalLang::where('status', '1');
        $q = $q->whereHas('lang', $callback)
        ->with('lang', $callback)->first();

        if ($q) {
            return $q->lang[0]->value;
        }
        return $key;
    }
}

if (!function_exists('locLang')) {
    function locLang()
    {
        $lang = LocalLang::where('lable', '!=', null);
        if (auth()->check()) {
            $lang->where('company_id', auth()->user()->company_id);
        }
        return $lang->get();
    }
}


if (!function_exists('rp')) {
    function rp($number)
    {
        return number_format($number,2,',','.');
    }
}

if (!function_exists('wa')) {
    function wa($number)
    {
        $c = substr($number, 0, 2);
        if ($c == '08') {
            $nmr = substr($number, 2);
            return '+628'.$nmr;
        } else {
            return $number;
        }
    }
}