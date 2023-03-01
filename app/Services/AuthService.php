<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function login($request)
    {
        try {
            $user = User::where('email', $request->email)->first();
            if (! $user || ! Hash::check($request->password, $user->password)) {
                throw ValidationException::withMessages([
                    'email' => ['The provided credentials are incorrect.'],
                ]);
            }else{
                $token = $user->createToken('api-token')->plainTextToken;
                $data = [
                    'status_code' => 200,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => $user
                ];

                $response = ResponseService::toArray(true, 'Success!', $data);
                return ResponseService::toJson($response);
            }
        } catch (\Throwable $th) {
            $response = ResponseService::toArray(false, $th->getMessage());
            return ResponseService::toJson($response, 200);
        }
    }
}
