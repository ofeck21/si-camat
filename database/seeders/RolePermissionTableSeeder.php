<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RolePermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::firstOrCreate([
            'name'  => 'Super Admin'
        ]);

        $administrator = Role::firstOrCreate([
            'name'  => 'Administrator'
        ]);

        $permissions = Permission::all();

        $permissions->each(function($permission) use ($administrator){
            if($permission->module_id != 3){
                $administrator->givePermissionTo($permission->name);
            }
        });
    }
}
