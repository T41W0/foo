import { CartModel } from "../models/cartmodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class AddCartApi extends RequestManager<DataSucces<CartModel>, requestProp>{
    constructor(data: object) {
        super(RequestMethod.POST, `cart/add`, data);
    }

    protected data(json: JSON): DataSucces<CartModel> {
        return new DataSucces(CartModel.fromJson(json));
    }
    protected error(json: JSON, status: number): DataSucces<CartModel> {
        throw Failures.parseError(json, status);
    }

}