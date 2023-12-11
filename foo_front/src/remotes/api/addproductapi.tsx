import { ProductModel } from "../models/productmodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class AddProductApi extends RequestManager<DataSucces<ProductModel>, requestProp>{
    constructor(data: object) {
        super(RequestMethod.POST, `product/add`, data);
    }
    protected data(json: JSON): DataSucces<ProductModel> {
        return new DataSucces(ProductModel.fromJson(json));
    }
    protected error(json: JSON, status: number): DataSucces<ProductModel> {
        throw Failures.parseError(json, status);
    }

}