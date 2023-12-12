import { UserModel } from "../models/usermodel";
import { DataSucces, Failures } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";



export class LoginApi extends RequestManager<DataSucces<UserModel>, requestProp>{
    protected data(json: JSON): DataSucces<UserModel> {
        return new DataSucces(UserModel.fromJson(json));
    }
    protected error(json: JSON, status: number): DataSucces<UserModel> {
        throw Failures.parseError(json, status);
    }

}