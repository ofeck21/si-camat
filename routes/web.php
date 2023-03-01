<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DashboarController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\LangController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route For Authentication //
Route::get('/login', [AuthController::class, 'login'])->name('login');
Route::post('/login', [AuthController::class, 'loginProcess']);
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/forgot-password', [AuthController::class, 'forgotPassword'])->name('forgot');
Route::post('/forgot-password', [AuthController::class, 'forgotPasswordProcess']);
Route::get('/reset-password', [AuthController::class, 'resetPassword'])->name('reset');
Route::post('/reset-password', [AuthController::class, 'resetPasswordProcess']);

Route::get('/lang/{lang}', [LanguageController::class, 'switch'])->name('switch.lang');
// Route with middleware
Route::middleware(['auth'])->group(function () {
    Route::controller(DashboarController::class)->middleware('can:view dashboard')->group(function ()
    {
        Route::get('/', 'index')->name('dashboard');
    });

    Route::controller(UserController::class)->middleware('can:view user')->group(function ()
    {
        Route::get('/users', 'index')->name('user');
        Route::get('/users-datatable', 'userDataTable')->name('user.datatable');
        Route::post('/users', 'store')->name('user.store');
        Route::get('/users/{id}', 'show')->name('user.show');
        Route::put('/users/{id}', 'update')->name('user.update');
        Route::delete('/users/{id}', 'destroy')->name('user.destroy');
        Route::get('/profile', 'profile')->name('user.profile');
    });

    Route::controller(MaterialController::class)->middleware('can:view material')->group(function ()
    {
        Route::get('/material', 'index')->name('material');
        Route::get('/material-datatable', 'materialDataTable')->name('material.datatable');
        Route::post('/material', 'store')->name('material.store')->middleware('can:create material');
        Route::get('/material/{id}', 'show')->name('material.show');
        Route::put('/material/{id}', 'update')->name('material.update')->middleware('can:update material');
        Route::delete('/material/{id}', 'destroy')->name('material.destroy')->middleware('can:delete material');
    });
    Route::controller(ReportController::class)->middleware('can:view report')->group(function ()
    {
        Route::get('/report', 'index')->name('report');
        Route::get('/report-datatable', 'reportDataTable')->name('report.datatable');
        Route::get('/material/{id}', 'show')->name('material.show');
    });
    Route::controller(RoleController::class)->middleware('can:view role')->group(function ()
    {
        Route::get('/roles', 'index')->name('role');
        Route::post('/roles', 'store')->name('role.store');
        Route::get('/roles/{id}', 'show')->name('role.show');
        Route::put('/roles/{id}', 'update')->name('role.update');
        Route::delete('/roles/{id}', 'destroy')->name('role.destroy');
    });

    Route::controller(LangController::class)->middleware('can:view lang')->group(function ()
    {
        Route::get('/languages', 'index')->name('languages');
        Route::post('/languages', 'store')->name('lang.store');
        Route::get('/languages/{id}', 'show')->name('lang.show');
        Route::post('/languages/{id}', 'update')->name('lang.update');
        Route::post('/languages-update', 'edit')->name('languages.update');
        Route::post('/set-language', 'setLanguage')->name('set-language');

        Route::post('/languages-detete', 'destroy')->name('lang.destroy');
    });

});
