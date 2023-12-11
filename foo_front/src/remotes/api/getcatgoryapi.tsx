import { CategoryModel } from "../models/categorymodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class GetCatgoryApi extends RequestManager<DataSucces<CategoryModel[]>, requestProp>{
    constructor(type: string = "user") {
        super(RequestMethod.GET, `category/get/${type}`, {});
    }


    protected data(json: JSON): DataSucces<CategoryModel[]> {
        const categories: CategoryModel[] = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        json.forEach((category) => {
            categories.push(CategoryModel.fromJson(category));
        });
        return new DataSucces(categories);
    }
    protected error(json: JSON, status: number): DataSucces<CategoryModel[]> {
        throw Failures.parseError(json, status);
    }

}