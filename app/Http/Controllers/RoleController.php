<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    public function index()
    {
        $pageConfigs = ['pageHeader' => true];
        $breadcrumbs = [
            ['name' => "Role and Permissions List"]
        ];

       $modules = Module::with('permissions')->get();


        $roles = Role::whereNot('name', 'Super Admin')->withCount('users')->get();

        return view('/content/role/index', [
            'pageConfigs'   => $pageConfigs,
            'breadcrumbs'   => $breadcrumbs,
            'roles'         => $roles,
            'modules'       => $modules
        ]);
    }

    public function show($id)
    {
        $role = Role::where('id', $id)->with('permissions')->first();

        if($role!=null){
            return response()->json([
                'status'    => true,
                'message'   => 'Detail Data',
                'data'      => $role
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
        $user = Auth::user();

        $roles = [
            'role_name' => 'required|unique:roles,name'
        ];

        $this->validate($request, $roles);

        DB::beginTransaction();
        try {
            $role = Role::create([
                'name'  => $request->role_name
            ]);


            if ($role) {
                // Assign Role Permissions
                foreach ($request->permissions as $permission) {
                    $permission_name = Permission::whereId($permission['id'])->first()->name;
                    if($permission['status'] == 'true'){
                        $role->givePermissionTo($permission_name);
                    }
                }
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
        $user = Auth::user();

        $roles = [
            'role_name' => 'required|unique:roles,name,'.$id
        ];

        $this->validate($request, $roles);

        DB::beginTransaction();
        try {
            $role = Role::find($id);
            $role->name = $request->role_name;

            if ($role->save()) {
                // Assign Role Permissions
                foreach ($request->permissions as $permission) {
                    $permission_name = Permission::whereId($permission['id'])->first()->name;
                    if($permission['status'] == 'true'){
                        $role->givePermissionTo($permission_name);
                    }else{
                        if(($role->hasPermissionTo($permission_name))){
                            $role->revokePermissionTo($permission_name);
                        }
                    }
                }
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
        $role = Role::findOrFail($id);

        if($role->delete()){
            return response()->json([
                'status'    => true,
                'message'   => 'Data has been deleted',
                'data'      => $role
            ]);
        }else{
            return response()->json([
                'status'    => false,
                'message'   => 'Data not found',
                'data'      => null
            ]);
        }
    }
}
