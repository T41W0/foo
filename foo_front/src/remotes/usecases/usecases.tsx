import { AddCartApi } from "../api/addcartapi";
import { AddCategoryApi } from "../api/addcategoryapi";
import { AddProductApi } from "../api/addproductapi";
import { DeleteCatgoryApi } from "../api/deletecatgoryapi";
import { DeleteProductApi } from "../api/deleteproductapi";
import { EditCatgoryApi } from '../api/editcatgoryapi';
import { EditProductApi } from "../api/editproductapi";
import { FetchCartApi } from "../api/fetchcartapi";
import { FetchCatgoryApi } from "../api/fetchcatgoryapi";
import { FetchProductApi } from "../api/fetchproductapi";
import { DeleteCartApi } from '../api/deletecartapi';
import { GetCatgoryApi } from '../api/getcatgoryapi';

export class GeneralUsecase {
    //category
    public static addCategory(form: object) {
        return new AddCategoryApi(form).sendRequest();
    }
    public static getUserCategory() {
        return new GetCatgoryApi().sendRequest();
    }

    public static getAdminCategory() {
        return new GetCatgoryApi("").sendRequest();
    }
    public static editCategory(id: number, form: object) {
        return new EditCatgoryApi(id, form).sendRequest();
    }
    public static fetchCategory(id: number) {
        return new FetchCatgoryApi(id).sendRequest();
    }
    public static deleteCategory(id: number) {
        return new DeleteCatgoryApi(id).sendRequest();
    }

    //product
    public static addProduct(form: object) {
        return new AddProductApi(form).sendRequest();
    }
    public static editProduct(id: number, form: object) {
        return new EditProductApi(id, form).sendRequest();
    }
    public static fetchProduct(id: number) {
        return new FetchProductApi(id).sendRequest();
    }
    public static deleteProduct(id: number) {
        return new DeleteProductApi(id).sendRequest();
    }

    //cart
    public static addCart(form: object) {
        return new AddCartApi(form).sendRequest();
    }
    public static editCart(id: number, form: object) {
        return new EditCatgoryApi(id, form).sendRequest();
    }
    public static fetchCart(id: number) {
        return new FetchCartApi(id).sendRequest();
    }
    public static deleteCart(id: number) {
        return new DeleteCartApi(id).sendRequest();
    }
}