<?php
namespace App\Services;

use App\Models\User;
use Illuminate\Validation\ValidationException;

class UserService
{
    public function userLogin($userId)
    {
        try {
            $user = User::where('id', $userId)->first();
            if (! $user) {
                throw ValidationException::withMessages(['failed' => 'User not found']);
            }else{
                $response = ResponseService::toArray(true, 'Success!', $user);
                return ResponseService::toJson($response);
            }
        } catch (\Throwable $th) {
            $response = ResponseService::toArray(false, $th->getMessage());
            return ResponseService::toJson($response, 200);
        }
    }
}
