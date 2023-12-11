import { ProductModel } from "../models/productmodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class GetProductApi extends RequestManager<DataSucces<ProductModel[]>, requestProp>{
    constructor(type: string = "user") {
        super(RequestMethod.GET, `product/get/${type}`, {});
    }

    protected data(json: JSON): DataSucces<ProductModel[]> {
        const products: ProductModel[] = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        json.forEach((product) => {
            products.push(ProductModel.fromJson(product));
        });
        return new DataSucces(products);

    }
    protected error(json: JSON, status: number): DataSucces<ProductModel[]> {
        throw Failures.parseError(json, status);
    }

}