<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Utils\Errors\ForbiddenResponse;
use App\Utils\Errors\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CartController extends Controller
{
    public function get()
    {
        $products = Cart::with(["order"])->get();
        return new SuccessResponse($products);

    }
    public function fetch($id)
    {
        $products = Cart::where("id", "=", $id)->with(["order"])->first();
        return new SuccessResponse($products);

    }
    public function add(Request $request)
    {
        $userId = auth()->id();
        $transactionId = md5(time() + 300 * rand(time(), time() * 5000));

        $validate = Validator::make($request->all(), [
            "items" => "required",
            "total" => "required",
        ]);
        if ($validate->fails()) {
            return new ForbiddenResponse($validate->messages()->all());
        }

        $products = new Cart();
        $products->user = $userId;
        $products->items = $request->items;
        $products->total = $request->total;
        $products->transaction_id = $transactionId;
        $products->save();
        return new SuccessResponse($products);
    }

    public function delete($id)
    {
        $products = Cart::where("id", "=", $id)->first();
        if (!$products) {
            return new ForbiddenResponse(["message" => "cart is not found"]);
        }
        $products->delete();
        $products->save();
        return new SuccessResponse(["message" => "deleted"]);
    }
}