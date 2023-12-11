import { CategoryModel } from "../models/categorymodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class FetchCatgoryApi extends RequestManager<DataSucces<CategoryModel>, requestProp>{
    constructor(id: number) {
        super(RequestMethod.GET, `category/fetch/${id}`, {});
    }

    protected data(json: JSON): DataSucces<CategoryModel> {
        return new DataSucces(CategoryModel.fromJson(json));
    }
    protected error(json: JSON, status: number): DataSucces<CategoryModel> {
        throw Failures.parseError(json, status);
    }

}