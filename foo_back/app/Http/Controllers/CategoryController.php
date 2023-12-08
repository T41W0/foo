<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Utils\Errors\ForbiddenResponse;
use App\Utils\Errors\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function get()
    {
        $products = Category::with(["products"])->get();
        return new SuccessResponse($products);

    }
    public function fetch($id)
    {
        $products = Category::where("id", "=", $id)->with(["products"])->first();
        return new SuccessResponse($products);

    }
    public function add(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "name" => "required",
        ]);
        if ($validate->fails()) {
            return new ForbiddenResponse($validate->messages()->all());
        }
        $products = new Category();
        $products->name = $request->name;
        $products->save();
        return new SuccessResponse($products);
    }
    public function update(Request $request, $id)
    {
        $products = Category::where("id", "=", $id)->first();
        if (!$products) {
            return new ForbiddenResponse(["message" => "category is not found"]);
        }

        if ($request->has("name")) {
            $products->name = $request->name;
        }

        $products->save();
        return new SuccessResponse($products);
    }

    public function delete($id)
    {
        $products = Category::where("id", "=", $id)->first();
        if (!$products) {
            return new ForbiddenResponse(["message" => "category is not found"]);
        }
        $products->delete();
        $products->save();
        return new SuccessResponse(["message" => "deleted"]);
    }
}