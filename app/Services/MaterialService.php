<?php
namespace App\Services;

use Exception;
use App\Models\Stock;
use App\Models\Material;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class MaterialService
{
    protected $modelMaterial, $modelStock;

    public function __construct() {
        $this->modelMaterial = new Material();
        $this->modelStock = new Stock();
    }

    public function getAll($request)
    {
        try {
            $limit      = $request->input('limit', env('PER_PAGE'));
            $orderBy    = $request->input('order-by', 'created_at');
            $sort       = $request->input('sort', 'asc');
            $keyword    = $request->input('keyword');

            $validator = Validator::make($request->all(), [
                'limit'    => 'nullable|integer',
                'orderBy'  => 'nullable|in:name',
                'sort'     => 'nullable|in:asc,desc',
                'keyword'  => 'nullable|string|max:100'
            ]);

            if($validator->fails()) {
                throw ValidationException::withMessages(['error'=>$validator->errors()]);
            }

            $query = $this->modelMaterial->when($keyword, function($q) use ($keyword) {
                        $q->where('name', 'ilike', '%'.$keyword.'%');
                        $q->orWhere('description', 'ilike', '%'.$keyword.'%');
                    });

            $itemData = $query->orderBy($orderBy, $sort)->paginate($limit);
            return ResponseService::toJson($itemData);

        } catch (\Throwable $e) {
            $response = ResponseService::toArray(false, $e->getMessage());
            return ResponseService::toJson($response, 200);
        }
    }

    public function show($id)
    {
        try {
            $itemData = $this->modelMaterial->where('id', $id)->first();
            if(!$itemData) throw new Exception("No query results");

            $response = ResponseService::toArray(true, 'Success!', $itemData);
            return ResponseService::toJson($response);
        } catch (\Throwable $th) {
            $response = ResponseService::toArray(false, $th->getMessage());
            return ResponseService::toJson($response, 200);
        }
    }

    public function store($request)
    {
        DB::beginTransaction();
        try {
            $material = $this->modelMaterial->create([
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

    public function update($request, $id)
    {
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

    public function delete($id)
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
