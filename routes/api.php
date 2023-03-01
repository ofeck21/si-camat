<?php

use App\Http\Controllers\API\v1\AuthController;
use App\Http\Controllers\API\v1\UserController;
use App\Http\Controllers\API\v1\MaterialController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['prefix'=>'v1'], function(){
    Route::controller(AuthController::class)->group(function () {
        Route::post('/login', 'login');
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::controller(UserController::class)->group(function(){
            Route::get('/user', 'getUser');
        });

        Route::controller(MaterialController::class)->group(function(){
            Route::get('/materials', 'getAll');
            Route::get('/materials/{id}', 'show');
            Route::post('/materials', 'store');
            Route::put('/materials/{id}', 'update');
            Route::delete('/materials/{id}', 'destroy');
        });
    });
});
