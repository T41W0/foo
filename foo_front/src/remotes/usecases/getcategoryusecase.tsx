import { GetCatgoryApi } from "../api/getcatgoryapi";
import { CategoryModel } from "../models/categorymodel";
import { DataResources } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { Usecase } from "../utils/usecases";


export class GetCategoryUseCase extends Usecase<requestProp>{

    protected async call(): Promise<DataResources<CategoryModel[]>> {
        const api: GetCatgoryApi = new GetCatgoryApi();
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await api.sendRequest();
    }
    public static execute() {
        return new GetCategoryUseCase().call();
    }



}