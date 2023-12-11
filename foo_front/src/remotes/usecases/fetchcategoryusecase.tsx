import { FetchCatgoryApi } from "../api/fetchcatgoryapi";
import { CategoryModel } from "../models/categorymodel";
import { DataResources } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { Usecase } from "../utils/usecases";


export class FetchCategoryUseCase extends Usecase<requestProp>{

    protected async call(param: requestProp | undefined): Promise<DataResources<CategoryModel>> {
        const api: FetchCatgoryApi = new FetchCatgoryApi(param?.id ?? 0);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await api.sendRequest();
    }
    public static execute(id: number) {
        return new FetchCategoryUseCase().call({ id: id });
    }



}