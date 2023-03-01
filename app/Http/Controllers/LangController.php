<?php

namespace App\Http\Controllers;

use App\Http\Requests\LangRequest;
use App\Models\Lang;
use App\Services\LangServices;
use Illuminate\Http\Request;

class LangController extends Controller
{
    protected $langServices;

    public function __construct() {
        $this->langServices = new LangServices();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data['data']   = $this->langServices->getAll();
        // return $data;
        return view('content.lang.index', $data);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(LangRequest $request)
    {
        return $this->langServices->addLanguage($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function show(Lang $lang)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function edit(LangRequest $request)
    {
        return $this->langServices->updateLanguage($request);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function update($lang)
    {
        return $this->langServices->updateData($lang);
    }
    
    public function setLanguage()
    {
        return $this->langServices->setActiveLanguage();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Lang  $lang
     * @return \Illuminate\Http\Response
     */
    public function destroy(LangRequest $request)
    {
        return $this->langServices->deleteLanguage($request);
    }
}
