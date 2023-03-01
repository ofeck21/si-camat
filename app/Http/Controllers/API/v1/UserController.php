<?php

namespace App\Http\Controllers\API\v1;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    protected $userService;

    public function __construct() {
        $this->userService = new UserService();
    }

    public function getUser(Request $request)
    {
        return $this->userService->userLogin($request->user()->id);
    }
}
