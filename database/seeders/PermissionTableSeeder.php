<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modules = Module::all();

        $modules->each(function($module){
            $features = json_decode($module->features, true);
            foreach ($features as $feature) {
                $permission_name = $feature.' '.$module->slug;
                Permission::updateOrCreate(['name' => $permission_name],[
                    'name'      => $permission_name,
                    'module_id' => $module->id
                ]);
            }
        });
    }
}
