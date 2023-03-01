<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class DashboarController extends Controller
{
    public function index()
    {
        $pageConfigs = ['pageHeader' => false];

        $material   = (object) [
            'total' => Material::count(),
            'total_raw'   => Material::whereHas('stock', function($q){
                                $q->where('type', 'raw');
                            })->count(),
            'total_ripe'   => Material::whereHas('stock', function($q){
                                $q->where('type', 'ripe');
                            })->count(),
            'total_ready'   => Material::whereHas('stock', function($q){
                                $q->where('type', 'ready');
                            })->count()
        ];

        return view('/content/dashboard', ['pageConfigs' => $pageConfigs, 'material'=> $material]);
    }
}
