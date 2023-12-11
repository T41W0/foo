import { CartModel } from "../models/cartmodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class FetchCartApi extends RequestManager<DataSucces<CartModel>, requestProp>{
    constructor(id: number) {
        super(RequestMethod.GET, `cart/fetch/${id}`, {});
    }

    protected data(json: JSON): DataSucces<CartModel> {
        return new DataSucces(CartModel.fromJson(json));
    }
    protected error(json: JSON, status: number): DataSucces<CartModel> {
        throw Failures.parseError(json, status);
    }

}