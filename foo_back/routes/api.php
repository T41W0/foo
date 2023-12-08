<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Utils\Errors\ForbiddenResponse;
use App\Utils\Errors\SuccessResponse;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get("/login", function () {
    return new ForbiddenResponse(["message" => "You must log in first!!"]);
})->name("login");


/**
 * guest
 * login
 * create
 * forgetPassword
 *changePassword
 * 
 */
Route::post("/account/login", [UserController::class, "login"]);
Route::post("/create", [UserController::class, "create"]);
Route::post("/forget/password", [UserController::class, "forgetPassword"]);
Route::post("/change/password", [UserController::class, "changePassword"]);





Route::middleware('auth:sanctum')->group(function () {
    Route::get("/auth", function () {
        return new SuccessResponse(['message' => "logged in",]);
    });

    /**
     * product
     * get
     */
    Route::get("/product/get/user", [ProductController::class, "get"]);

    /**
     * category
     * get
     */
    Route::get("/category/get/user", [CategoryController::class, "get"]);

    /**
     * Cart
     * create
     * get
     */
    Route::get("/cart/get/user", [CartController::class, "get"]);
    Route::post("/cart/create", [CartController::class, "add"]);


    /**
     * order
     * create
     * get
     */
    Route::get("/order/get/user", [OrderController::class, "get"]);
    Route::post("/order/create", [OrderController::class, "add"]);

    Route::get("/category/fetch/{id}", [CategoryController::class, "fetch"]);


    /**
     * authenticated
     *logout
     */
    Route::delete("/logout", [UserController::class, "logout"]);

});


Route::middleware(["isAdmin"])->group(function () {
    /**
     * product
     * add
     * delete
     * update
     * get
     */
    Route::get("/product/get", [ProductController::class, "get"]);
    Route::get("/product/fetch/{id}", [ProductController::class, "fetch"]);
    Route::post("/product/add", [ProductController::class, "add"]);
    Route::post("/product/update/{id}", [ProductController::class, "update"]);
    Route::delete("/product/delete/{id}", [ProductController::class, "delete"]);


    /**
     * category
     * add
     * update
     * delete
     * get
     */
    Route::get("/category/get", [CategoryController::class, "get"]);
    Route::post("/category/add", [CategoryController::class, "add"]);
    Route::post("/category/update/{id}", [CategoryController::class, "update"]);
    Route::delete("/category/delete/{id}", [CategoryController::class, "delete"]);



    /**
     * Cart
     * get
     * delete
     */
    Route::get("/cart/get", [CartController::class, "get"]);
    Route::get("/cart/fetch/{id}", [CartController::class, "fetch"]);
    Route::delete("/cart/delete/{id}", [CartController::class, "delete"]);



    /**
     * order
     * get
     * delete
     */

    Route::get("/order/get", [OrderController::class, "get"]);
    Route::get("/order/fetch/{id}", [OrderController::class, "fetch"]);
    Route::delete("/order/delete/{id}", [OrderController::class, "delete"]);

    /**
     * user
     * ban
     * unban
     */


});