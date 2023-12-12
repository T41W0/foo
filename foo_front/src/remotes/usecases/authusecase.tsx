import { AuthApi } from "../api/authapi";
import { AuthModel } from "../models/authmodel";
import { DataResources } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestMethod } from "../utils/requestypes";
import { Usecase } from "../utils/usecases";


export class AuthUseCase extends Usecase<requestProp>{

    protected async call(param: requestProp | undefined): Promise<DataResources<AuthModel>> {
        const api: AuthApi = new AuthApi(RequestMethod.GET, "check", param ?? {});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await api.sendRequest();
    }
    public static execute() {
        return new AuthUseCase().call(undefined);
    }



}