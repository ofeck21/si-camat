<?php

namespace Database\Seeders;

use App\Models\Lang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use function PHPSTORM_META\map;

class LangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */

    protected $en = [
        "Validation"                        => "",
        "The :attribute field is required"  => "The :attribute field is required",
        "The :attribute must be a valid email address"  => "The :attribute must be a valid email address",
        "The :attribute must be a number"   => "The :attribute must be a number",
        "The :attribute has already been taken" => "The :attribute has already been taken",
        "The :attribute must be :max kilobytes" => "The :attribute must be :max kilobytes",

        'Sidebar Menu'                      => '',
        'Menu Dashboard'                    => 'Dashboard',
        'Menu Application'                  => 'Application',
        'Menu User'                         => 'User',
        'Menu Settings'                     => 'Settings',
        'Menu Role'                         => 'Role',
        'Menu Language Settings'            => 'Language Settings',
        'Menu Material'                     => 'Material',
        'Menu Report'                       => 'Report',

        "Language Settings"                             => "",
        "Language Add New"                              => "Add New",
        "Language Set"                                  => "Set",
        "Language Add Language"                         => "Add Language",
        "Language Lable"                                => "Language",
        "Set Default Value"                             => "Set Default Value",
        "Language Locale"                               => "Locale",
        "Language edit"                                 => "Edit",
        "Language Delete"                               => "Delete",

        'General'                                       => '',
        'General.Add New'                               => 'Add New',
        'General.Select'                                => 'Select',
        'General.Close'                                 => 'Close',
        'General.Save'                                  => 'Save',
        'General.Name'                                  => 'Name',
        'General.Actions'                               => 'Actions',
        'General.Note'                                  => 'Note',
        'General.Status'                                => 'Status',
        'General.Email'                                 => 'Email',
        'General.File'                                  => 'File',
        'General.Change'                                => 'Change',
        'General.Description'                           => 'Description'
    ];

    protected $id = [
        "Validation"                        => "",
        "The :attribute field is required"  => "Kolom :attribute wajib diisi",
        "The :attribute must be a valid email address"  => ":attribute harus berupa alamat email yang valid.",
        "The :attribute must be a number"   => ":attribute harus berupa nomor",
        "The :attribute has already been taken" => ":attribute telah diambil",
        "The :attribute must be :max kilobytes" => "The :attribute must be :max kilobytes indo",

        'Sidebar Menu'                      => '',
        'Menu Dashboard'                    => 'Dashbor',
        'Menu Application'                  => 'Aplikasi',
        'Menu User'                         => 'Pengguna',
        'Menu Settings'                     => 'Pengaturan',
        'Menu Role'                         => 'Peran',
        'Menu Language Settings'            => 'Pengaturan Bahasa',
        'Menu Material'                     => 'Bahan',
        'Menu Report'                       => 'Laporan',

        "Language Settings"                             => "",
        "Language Add New"                              => "Tambah Baru",
        "Language Set"                                  => "Atur",
        "Language Add Language"                         => "Tambah Bahasa",
        "Language Lable"                                => "Bahasa",
        "Set Default Value"                             => "Atur Sebagai Utama",
        "Language Locale"                               => "Lokal",
        "Language edit"                                 => "Ubah",
        "Language Delete"                               => "Hapus",

        'General'                                       => '',
        'General.Add New'                               => 'Tambah Baru',
        'General.Select'                                => 'Pilih',
        'General.Close'                                 => 'Tutup',
        'General.Save'                                  => 'Simpan',
        'General.Name'                                  => 'Nama',
        'General.Actions'                               => 'Aksi',
        'General.Note'                                  => 'Catatan',
        'General.Status'                                => 'Status',
        'General.Email'                                 => 'Email',
        'General.File'                                  => 'File',
        'General.Change'                                => 'Ubah',
        'General.Description'                           => 'Deskripsi'
    ];


    public function run()
    {
        Lang::where('id', '>', '0')->delete();
        $no_en = 1;
        foreach ($this->en as $key => $value) {
            Lang::updateOrCreate([
                'id'            => $no_en++,
                'local_lang_id' => 1,
                'key'           => $key,
                'value'         => $value
            ]);
        }


        $no_id = count($this->id)+1;
        foreach ($this->id as $key => $value) {
            Lang::updateOrCreate([
                'id'            => $no_id++,
                'local_lang_id' => 2,
                'key'           => $key,
                'value'         => $value
            ]);
        }
    }
}
