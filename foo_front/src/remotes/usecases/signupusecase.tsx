import { SignupApi } from "../api/signupapi";
import { UserModel } from "../models/usermodel";
import { DataResources } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { Usecase } from "../utils/usecases";


export class SignupUseCase extends Usecase<requestProp>{

    protected async call(param: requestProp | undefined): Promise<DataResources<UserModel>> {
        const api: SignupApi = new SignupApi( param ?? {});
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return await api.sendRequest();
    }
    public static execute(ev: MouseEvent, param: requestProp) {
        ev.preventDefault()
        return new SignupUseCase().call(param);
    }



}