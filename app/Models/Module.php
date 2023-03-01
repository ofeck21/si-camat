<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;

class Module extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected $casts = [
        'features' => 'array'
    ];

    public function permissions()
    {
        return $this->hasMany(Permission::class);
    }

    // public function submenu()
    // {
    //     return $this->hasMany(Module::class, 'parent', 'id');
    // }
}
