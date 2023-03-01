<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\Auth;

class ReportController extends Controller
{
    public function index()
    {
        $pageConfigs = ['pageHeader' => true];
        $breadcrumbs = [
            ['name' => __('menu.Report')]
        ];
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

        return view('/content/report/index', [
            'pageConfigs'   => $pageConfigs,
            'breadcrumbs'   => $breadcrumbs,
            'material'      => $material
        ]);
    }

    public function reportDataTable(Request $request)
    {
        $user = Auth::user();

        return DataTables::of(
                    Material::query()->with('stock')
                )
                ->filter(function($query) use ($request){
                    if (!empty($request->search['value'])) {
                        $query->search($request->search['value']);
                    }
                })
                ->editColumn('type', function($row){
                    switch ($row->stock->type) {
                        case 'raw':
                            return 'Mentah';
                            break;
                        case 'ripe':
                            return 'Setengah Jadi';
                            break;
                        case 'ready':
                            return 'Jadi';
                            break;
                        default:
                            break;
                    }
                })
                ->editColumn('stock', function($row){
                    return $row->stock->stock;
                })
                ->addIndexColumn()
                ->rawColumns(['type', 'stock'])
                ->make();
    }
}
