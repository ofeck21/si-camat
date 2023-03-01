<?php

namespace Database\Seeders;

use App\Models\LocalLang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocalLangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $local = [
            [
                "id"                => 1,
                "company_id"        =>  null,
                "locale"            =>  "en",
                "lable"             =>  "English",
                "status"            =>  '0',
            ],
            [
                "id"                => 2,
                "company_id"        =>  null,
                "locale"            =>  "id",
                "lable"             =>  "Indonesia",
                "status"            =>  '1',
            ]
        ];
        LocalLang::where('id', '!=', '0')->delete();
        foreach ($local as $key => $value) {
            LocalLang::updateOrCreate($value);
        }
    }
}