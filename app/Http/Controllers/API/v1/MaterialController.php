<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Services\MaterialService;
use App\Http\Controllers\Controller;
use App\Http\Requests\MaterialRequest;

class MaterialController extends Controller
{
    protected $materialService;

    public function __construct() {
        $this->materialService = new MaterialService();
    }

    public function getAll(Request $request)
    {
        return $this->materialService->getAll($request);
    }

    public function show($id)
    {
        return $this->materialService->show($id);
    }

    public function store(MaterialRequest $request)
    {
       return $this->materialService->store($request);
    }

    public function update(MaterialRequest $request, $id)
    {
        return $this->materialService->update($request, $id);
    }

    public function destroy($id)
    {
        return $this->materialService->delete($id);
    }

}
