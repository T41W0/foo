import { CategoryModel } from "../models/categorymodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";
import { RequestMethod } from "../utils/requestypes";



export class EditCatgoryApi extends RequestManager<DataSucces<CategoryModel>, requestProp>{
    constructor(id: number, form: object) {
        super(RequestMethod.POST, `category/update/${id}`, form);
    }

    protected data(json: JSON): DataSucces<CategoryModel> {
        return new DataSucces(CategoryModel.fromJson(json));
    }
    protected error(json: JSON, status: number): DataSucces<CategoryModel> {
        throw Failures.parseError(json, status);
    }

}