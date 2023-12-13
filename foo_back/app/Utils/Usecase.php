<?php

namespace App\Utils;

use App\Models\User;
use App\Utils\Errors\ForbiddenResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class Usecase
{

    public static function isAdmin(mixed $user, mixed $callback): mixed
    {
        if (in_array(is_string($user) ? $user : $user->email, ["admin@admin.com","fayasrufai@email.com", "samuelclinton975@gmail.com", "administrator@admin.com"])) {
            return call_user_func($callback);
        } else {
            return new ForbiddenResponse(["message" => "access denied!"]);
        }
    }
    /**
     * checks if a user exist
     * @param int $user
     * @param mixed $callback
     * @return mixed
     */
    public static function userExist(int $user, $callback): mixed
    {
        $query = User::find($user);
        if (!$query) {
            return new ForbiddenResponse(["message" => "user not found"]);
        }
        return call_user_func($callback, $query);
    }

    /**
     * validates if a user password is the same
     * @param int $id
     * @param \Illuminate\Http\Request $request
     * @param mixed $callback
     * @param string $error
     * @return mixed
     */


    public static function validatePassword(int $id, Request $request, mixed $callback, string $error = "invalid password user
    combinations"): mixed
    {
        return self::userExist($id, function ($user) use ($request, $callback, $error) {
            if (Hash::check($request->password, $user->password)) {
                return call_user_func($callback, $user);
            } else {
                return new ForbiddenResponse(["message" => $error ?? "failed"]);
            }
        });

    }






}