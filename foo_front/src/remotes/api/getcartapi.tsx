import { CartModel } from "../models/cartmodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class GetCartApi extends RequestManager<DataSucces<CartModel[]>, requestProp>{
    constructor(type: string = "user") {
        super(RequestMethod.GET, `cart/get/${type}`, {});
    }

    protected data(json: JSON): DataSucces<CartModel[]> {
        const carts: CartModel[] = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        json.forEach((cart) => {
            carts.push(CartModel.fromJson(cart));
        });
        return new DataSucces(carts);

    }
    protected error(json: JSON, status: number): DataSucces<CartModel[]> {
        throw Failures.parseError(json, status);
    }

}