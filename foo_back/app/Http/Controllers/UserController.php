<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Helpers\UseCase;
use App\Models\User;
use App\Utils\Errors\ForbiddenResponse;
use App\Utils\Errors\SuccessResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function getUser()
    {
        return User::where("id", "=", auth()->id())->first();
    }

    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
        ]);
        if ($validate->fails()) {
            return new ForbiddenResponse($validate->messages()->all());
        }
        $query = User::where("email", "=", $request->email)->first();
        if (!$query) {
            return new ForbiddenResponse(["message" => "user does not exist"]);
        }
        if (!Hash::check($request->password, $query->password)) {
            return new ForbiddenResponse(["message" => "invalid password"]);
        }
        //send login mail
        auth()->login($query);
        $token = $query->createToken($request->email . "" . env("APP_NAME") . "_token", ["user"])->plainTextToken;

        return new SuccessResponse(["message" => "login success", "token" => $token]);

    }
    public function create(Request $request)
    {
        $validate = Validator::make($request->all(), [
            "email" => "required|email",
            "password" => "required",
        ]);
        if ($validate->fails()) {
            return new ForbiddenResponse($validate->messages()->all());
        }
        $query = User::where("email", "=", $request->email)->first();
        if ($query) {
            return new ForbiddenResponse(["message" => "user already exist"]);
        }
        $user = new User();
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        \App\Utils\Usecase::isAdmin($request->email, function () use ($user) {
            $user->role = "admin";
            $user->save();

        });
        $user->save();
        //send login mail
        //   auth()->login($query);
        $token = $user->createToken($request->email . "" . env("APP_NAME") . "_token", ["user"])->plainTextToken;

        return new SuccessResponse(["message" => "registration success", "token" => $token]);


    }
    public function forgetPassword(Request $request)
    {

    }
    public function changePassword(Request $request)
    {

    }
    public function logout()
    {
        auth()->logout();
        return new SuccessResponse(["message" => "logout success"]);
    }
}