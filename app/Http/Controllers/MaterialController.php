<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Stock;
use Illuminate\Http\Request;
use function PHPSTORM_META\map;
use Illuminate\Validation\Rule;
use Yajra\DataTables\DataTables;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class MaterialController extends Controller
{
    public function index()
    {
        $pageConfigs = ['pageHeader' => true];
        $breadcrumbs = [
            ['name' => "Material List"]
        ];

        return view('/content/material/index', [
            'pageConfigs'   => $pageConfigs,
            'breadcrumbs'   => $breadcrumbs
        ]);
    }

    public function materialDataTable(Request $request)
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
                ->editColumn('actions', function() use ($user){
                    return [
                        'edit'      => ($user->hasRole('Super Admin') OR $user->hasPermissionTo('update material')) ? true : false,
                        'delete'    => ($user->hasRole('Super Admin') OR $user->hasPermissionTo('delete material')) ? true : false,
                    ];
                })
                ->addIndexColumn()
                ->rawColumns(['actions', 'type', 'stock'])
                ->make();
    }

    public function show($id)
    {
        $material = Material::where('id', $id)->with('stock')->first();

        if($material!=null){
            return response()->json([
                'status'    => true,
                'message'   => 'Detail Data',
                'data'      => $material
            ]);
        }else{
            return response()->json([
                'status'    => false,
                'message'   => 'Data not found',
                'data'      => null
            ]);
        }
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name'      => 'required',
            'type'      => 'required',
            'stock'     => 'required|integer'
        ]);

        DB::beginTransaction();
        try {
            $material = Material::create([
                'name'          => $request->name,
                'description'   => $request->description
            ]);

            if ($material) {
                Stock::create([
                    'material_id'   => $material->id,
                    'type'          => $request->type,
                    'stock'         => $request->stock
                ]);
                DB::commit();
                return response()->json([
                    'status'    => true,
                    'message'   => 'New data has been created'
                ], 201);
            }else{
                DB::rollBack();
                return response()->json([
                    'status'    => true,
                    'message'   => 'Failed to create data'
                ], 400);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name'      => [
                'required',
                Rule::unique('materials', 'name')->ignore($id. 'id')
            ],
            'type'      => 'required',
            'stock'     => 'required|integer'
        ]);

        DB::beginTransaction();
        try {
            $material = Material::find($id);
            $material->name            = $request->name;
            $material->description     = $request->description;
            $material->stock->type     = $request->type;
            $material->stock->stock    = $request->stock;


            if ($material->save()) {
                DB::commit();
                return response()->json([
                    'status'    => true,
                    'message'   => 'Data has been updated'
                ], 201);
            }else{
                DB::rollBack();
                return response()->json([
                    'status'    => true,
                    'message'   => 'Failed to update data'
                ], 400);
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status'    => false,
                'message'   => $th->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $material = Material::findOrFail($id);

        if($material->delete()){
            return response()->json([
                'status'    => true,
                'message'   => 'Data has been deleted'
            ]);
        }else{
            return response()->json([
                'status'    => false,
                'message'   => 'Data not found'
            ]);
        }
    }

}
