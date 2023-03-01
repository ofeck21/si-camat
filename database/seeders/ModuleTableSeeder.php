<?php

namespace Database\Seeders;

use App\Models\Module;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function PHPSTORM_META\map;

class ModuleTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $modules = [
            [
                'name'  => 'Dashboard',
                'url'   => '/',
                'icon'  => 'home',
                'slug'  => 'dashboard',
            ],
            [
                'name'  => 'Application',
                'slug'  => 'application',
                'header'=> true,
            ],
            [
                'name'  => 'Material',
                'url'   => '/material',
                'icon'  => 'layers',
                'slug'  => 'material',
                'features'  => '["view","create","update","delete"]'
            ],
            [
                'name'  => 'Report',
                'url'   => '/report',
                'icon'  => 'check-circle',
                'slug'  => 'report',
                'features'  => '["view","export"]'
            ],
            [
                'name'  => 'Settings',
                'slug'  => 'setting',
                'header'=> true
            ],
            [
                'name'  => 'User',
                'url'   => '/users',
                'icon'  => 'user',
                'slug'  => 'user',
                'features'  => '["view","create","update","delete"]'
            ],
            [
                'name'  => 'Role',
                'url'   => '/roles',
                'icon'  => 'shield',
                'slug'  => 'role',
                'features'  => '["view","create","update","delete"]'
            ],
            [
                'name'  => 'Language Settings',
                'url'   => '/languages',
                'icon'  => 'twitch',
                'slug'  => 'languages',
                'features'  => '["view","create","update","delete"]'
            ]
        ];

        $order = 1;
        foreach ($modules as $module) {
            $parent = Module::updateOrCreate(['name'  => $module['name']],[
                'name'  => $module['name'],
                'url'   => $module['url'] ?? null,
                'icon'  => $module['icon'] ?? null,
                'slug'  => $module['slug'] ?? null,
                'header'=> $module['header'] ?? false,
                'order' => $order,
                'features' => $module['features'] ?? '["view"]'
            ]);

            $order++;

            if(array_key_exists('child', $module)){
                $order_child = 1;
                foreach($module['child'] as $child){
                    Module::updateOrCreate(['name'  => $child['name']],[
                        'parent'=> $parent->id,
                        'name'  => $child['name'],
                        'url'   => $child['url'] ?? null,
                        'icon'  => $child['icon'] ?? null,
                        'slug'  => $child['slug'] ?? null,
                        'order' => $order_child,
                        'features' => $module['features'] ?? '["view"]'
                    ]);
                    $order_child++;
                }
            }
        }
    }
}
