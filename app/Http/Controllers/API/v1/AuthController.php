<?php

namespace App\Http\Controllers\API\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;

class AuthController extends Controller
{
    protected $authService;

    public function __construct() {
        $this->authService = new AuthService();
    }

    public function login(LoginRequest $request)
    {
        // return 'test';
        $this->validate($request, [
            'email'     => 'required|email',
            'password'  => 'required'
        ]);

        return $this->authService->login($request);
    }
}
