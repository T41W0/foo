<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Utils\Errors\ForbiddenResponse;
use App\Utils\Errors\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function get()
    {
        $products = Product::with(["category"])->get();
        return new SuccessResponse($products);

    }
    public function fetch($id)
    {
        $products = Product::where("id", "=", $id)->first();
        return new SuccessResponse($products);

    }
    public function add(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "category" => "required",
            "name" => "required",
            "photo" => "required|mimes:jpg,png,gif,webp,jpeg",
            "price" => "required|max:20",
            "discount" => "required"
        ]);
        if ($validate->fails()) {
            return new ForbiddenResponse($validate->messages()->all());
        }
        $photo = $request->file("photo");
        $filename = md5(time()) . $photo->getClientOriginalName();
        $photo->move("uploads/", $filename);

        $products = new Product();
        $products->category = $request->category;
        $products->name = $request->name;
        $products->photo = env("HOST") . "/uploads/" . $filename;
        $products->price = $request->price;
        $products->discount = $request->discount;
        $products->save();
        return new SuccessResponse($products);
    }
    public function update(Request $request, $id)
    {
        $products = Product::where("id", "=", $id)->first();
        if (!$products) {
            return new ForbiddenResponse(["message" => "product is not found"]);
        }

        if ($request->hasFile("photo")) {

            $validate = Validator::make($request->all(), [
                "photo" => "required|mimes:jpg,png,gif,webp,jpeg",
            ]);
            if ($validate->fails()) {
                return new ForbiddenResponse($validate->messages()->all());
            }

            $photo = $request->file("photo");
            $filename = "uploads/" . md5(time()) . $photo->getClientOriginalName();
            $photo->move("uploads/", $filename);
            $products->photo = env("HOST") . "/uploads/" . $filename;
        }

        if ($request->has("category")) {
            $products->category = $request->category;
        }

        if ($request->has("name")) {
            $products->name = $request->name;
        }

        if ($request->has("price")) {
            $products->price = $request->price;
        }

        if ($request->has("discount")) {
            $products->discount = $request->discount;
        }

        $products->save();
        return new SuccessResponse($products);
    }

    public function delete($id)
    {
        $products = Product::where("id", "=", $id)->first();
        if (!$products) {
            return new ForbiddenResponse(["message" => "product is not found"]);
        }
        $products->delete();
        $products->save();
        return new SuccessResponse(["message" => "deleted"]);
    }


}