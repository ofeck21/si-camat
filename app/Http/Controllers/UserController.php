<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Yajra\DataTables\DataTables;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $pageConfigs = ['pageHeader' => true];
        $breadcrumbs = [
            ['name' => "User List"]
        ];
        $roles = Role::get();

        return view('/content/user/index', [
            'pageConfigs'   => $pageConfigs,
            'breadcrumbs'   => $breadcrumbs,
            'roles'         => $roles
        ]);
    }

    public function userDataTable(Request $request)
    {
        $user = Auth::user();

        return DataTables::of(
                    User::query()
                    ->whereNot('id', $user->id)
                    ->with(['roles'])
                )
                ->filter(function($query) use ($request){
                    if (!empty($request->search['value'])) {
                        $query->search($request->search['value']);
                    }
                })
                ->editColumn('actions', function(){
                    return [
                        'edit'  => $this->authorize('update user') ? true : false,
                        'delete' => $this->authorize('delete user') ? true : false,
                    ];
                })
                ->editColumn('is_super', function(){
                    return Auth::user()->hasRole('Super Admin');
                })
                ->addIndexColumn()
                ->rawColumns(['actions', 'is_super'])
                ->make();
    }

    public function show($id)
    {
        $user = User::where('id', $id)->with('roles')->first();

        if($user!=null){
            return response()->json([
                'status'    => true,
                'message'   => 'Detail Data',
                'data'      => $user
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
            'email'     => 'required|unique:users,email',
            'password'  => 'nullable|confirmed|min:8',
            'role'      => 'required|exists:roles,id'
        ]);

        DB::beginTransaction();
        try {
            $user = User::create([
                'name'      => $request->name,
                'email'     => $request->email,
                'password'  => $request->password ? Hash::make($request->password) : Hash::make('123456'),
                'email_verified_at' => now()
            ]);

            if ($user) {
                $role = Role::where('id', $request->role)->first();
                $user->assignRole($role->name);
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
            'name'      => 'required',
            'email'     => 'required|unique:users,email,'.$id,
            'password'  => 'nullable|confirmed|min:8',
            'role'      => 'required|exists:roles,id'
        ]);

        DB::beginTransaction();
        try {
            $user = User::find($id);
            $user->name     = $request->name;
            $user->email    = $request->email;

            if($request->password){
                $user->password = Hash::make($request->password);
            }

            if ($user->save()) {
                $role = Role::where('id', $request->role)->first();
                $user->syncRoles($role->name);
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
        $user = User::findOrFail($id);

        if($user->delete()){
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

    public function profile()
    {
        $pageConfigs = ['pageHeader' => true];
        $breadcrumbs = [
            ['name' => "Profile"]
        ];

        $user = User::where('id', Auth::id())->with('roles')->first();

        return view('content.user.profile', [
            'pageConfigs' => $pageConfigs,
            'breadcrumbs' => $breadcrumbs,
            'user'        => $user
        ]);
    }
}
