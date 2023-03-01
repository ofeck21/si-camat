<?php

namespace App\Providers;

use App\Models\Module;
use Illuminate\Support\ServiceProvider;
use View;
class MenuServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // get all data from menu.json file
        // $verticalMenuJson = file_get_contents(base_path('resources/data/menu-data/verticalMenu.json'));
        // $verticalMenuData = json_decode($verticalMenuJson);
        // $horizontalMenuJson = file_get_contents(base_path('resources/data/menu-data/horizontalMenu.json'));
        // $horizontalMenuData = json_decode($horizontalMenuJson);
        // $menu = Module::orderBy('order', 'asc')->get();

         // Share all menuData to all the views
        // \View::share('menuData',[$verticalMenuData, $horizontalMenuData]);
        View::composer('*', function($view)
        {
            $menu = Module::orderBy('order', 'asc')->get();
            $view->with('menuData', $menu);
        });
    }
}
