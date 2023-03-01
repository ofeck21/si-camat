<?php

namespace Database\Seeders;

use App\Models\Material;
use App\Models\Stock;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MaterialTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Sample Bahan
        Material::firstOrCreate(['id' => 1],[
            'id'    => 1,
            'name'  => 'Bahan 1',
            'description' => 'Contoh Bahan'
        ]);
        // Menambahkan Jenis Bahan
        Stock::firstOrCreate(['id'    => 1],[
            'material_id'   => 1,
            'type'          => 'raw',
            'stock'         => 10
        ]);

    }
}
