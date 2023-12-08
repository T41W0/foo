<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;


    public function order()
    {
        return $this->belongsTo(Cart::class, "cart", "id");
    }

    public function items()
    {
        $arr = json_decode($this->items) ?? [];
        if (count($arr) <= 0)
            return [];
        $query = Product::where("id", "=", $arr[0]);
        for ($i = 1; $i < count($arr); $i++) {
            $query->orWhere("id", "=", $arr[$i]);
        }
        return $query->get();
    }

}