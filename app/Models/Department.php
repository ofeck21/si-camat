<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Department extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    protected static function boot() {
        parent::boot();

        static::creating(function ($model) {
            $model->created_by = auth()->user() ? auth()->user()->id : 1;
            $model->updated_by = auth()->user() ? auth()->user()->id : 1;
        });

        static::updating(function($model) {
            $model->updated_by = auth()->user() ? auth()->user()->id : 1;
        });
    }

    public function scopeSearch($query, $keyword)
    {
        return $query->where('name', 'like', '%'.$keyword.'%')
                ->orWhereHas('company', function($q) use ($keyword){
                    $q->where('name', 'like', '%'.$keyword.'%');
                })
                ->orWhere('description', 'like', '%'.$keyword.'%');
    }

    public function company()
    {
        return $this->belongsTo(Company::class, 'company_id', 'id');
    }
}
