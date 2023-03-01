<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Option;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login()
    {
        if(Auth::check()){
            return redirect()->route('dashboard');
        }

        $pageConfigs = ['blankPage' => true];

        return view('/content/auth/login', ['pageConfigs' => $pageConfigs]);
    }

    public function loginProcess(Request $request)
    {
        $this->validate($request, [
            'email'     => 'required|email',
            'password'  => 'required'
        ]);

        $credentials = [
            'email'     => $request->email,
            'password'  => $request->password
        ];

        if(Auth::attempt($credentials, $request->remember_me)){
            $request->session()->regenerate();
            return redirect()->route('dashboard')->withMessage(__('auth.login_success'));
        }else{
            return redirect()->back()->withErrors(__('auth.failed'));
        }
    }

    public function logout()
    {
        Auth::logout();
        return redirect()->route('login');
    }

    public function register()
    {
        if(Auth::check()){
            return redirect()->route('dashboard');
        }
        $pageConfigs = ['blankPage' => true];
        $company_type = Option::companyType()->get();

        return view('/content/auth/register', [
            'pageConfigs' => $pageConfigs,
            'company_type' => $company_type
        ]);
    }

    public function registerProcess(Request $request)
    {
        $this->validate($request, [
            'full_name' => 'required',
            'email'     => 'required|unique:users,email',
            'password'  => 'required|confirmed|min:8',
            'company_name' => 'required',
            'company_type' => 'required|exists:options,id',
            'phone'     => 'nullable|numeric',
            'website'   => 'nullable|url',
            'address'   => 'required'
        ]);

        DB::beginTransaction();
        try {
            $company = Company::create([
                'name'      => $request->company_name,
                'company_type_id' => $request->company_type,
                'phone'     => $request->phone,
                'website'   => $request->website,
                'address'   => $request->address
            ]);

            $user = User::create([
                'name'      => $request->full_name,
                'email'     => $request->email,
                'password'  => Hash::make($request->password),
                'company_id'=> $company->id
            ]);

            if ($user) {
                $user->assignRole('Administrator');
                DB::commit();
                return response()->json([
                    'status'    => true,
                    'message'   => __('auth.register_success')
                ], 201);
            }else{
                DB::rollBack();
                return response()->json([
                    'status'    => true,
                    'message'   => __('auth.register_failed')
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

    public function forgotPassword()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/auth/forgot-password', ['pageConfigs' => $pageConfigs]);
    }

    public function forgotPasswordProcess(Request $request)
    {
        # code...
    }

    public function resetPassword()
    {
        $pageConfigs = ['blankPage' => true];

        return view('/content/auth/reset-password', ['pageConfigs' => $pageConfigs]);
    }

    public function resetPasswordProcess(Request $request)
    {
        # code...
    }
}
