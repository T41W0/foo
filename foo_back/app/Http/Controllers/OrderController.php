<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Utils\Errors\ForbiddenResponse;
use App\Utils\Errors\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function get()
    {
        $products = Order::with(["cart"])->get();
        return new SuccessResponse($products);

    }
    public function fetch($id)
    {
        $products = Order::where("id", "=", $id)->with(["cart"])->first();
        return new SuccessResponse($products);

    }
    public function add(Request $request)
    {
        $orderId = md5(time() + 300 * rand(time(), time() * 5000));

        $validate = Validator::make($request->all(), [
            "cart" => "required",
        ]);
        if ($validate->fails()) {
            return new ForbiddenResponse($validate->messages()->all());
        }

        $products = new Order();
        $products->cart = $request->cart;
        $products->order_id = $orderId;
        $products->save();
        return new SuccessResponse($products);
    }

    public function delete($id)
    {
        $products = Order::where("id", "=", $id)->first();
        if (!$products) {
            return new ForbiddenResponse(["message" => "Order is not found"]);
        }
        $products->delete();
        $products->save();
        return new SuccessResponse(["message" => "deleted"]);
    }
}