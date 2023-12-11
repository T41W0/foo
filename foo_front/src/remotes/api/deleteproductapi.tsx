import { ProductModel } from "../models/productmodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class DeleteProductApi extends RequestManager<DataSucces<ProductModel>, requestProp>{
    constructor(id: number) {
        super(RequestMethod.DELETE, `product/delete/${id}`, {});
    }

    protected data(json: JSON): DataSucces<ProductModel> {
        return new DataSucces(ProductModel.fromJson(json));
    }
    protected error(json: JSON, status: number): DataSucces<ProductModel> {
        throw Failures.parseError(json, status);
    }

}