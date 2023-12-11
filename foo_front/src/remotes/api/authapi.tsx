import { AuthModel } from "../models/authmodel";
import { DataException, DataSucces } from "../utils/datacenter";
import { requestProp } from "../utils/remote";
import { RequestManager } from "../utils/requestmanager";



export class AuthApi extends RequestManager<DataSucces<AuthModel>, requestProp>{
    protected data(json: JSON): DataSucces<AuthModel> {
        return new DataSucces(AuthModel.fromJson(json));
    }
    protected error(json: JSON): DataSucces<AuthModel> {
        return new DataException(AuthModel.fromJson(json));
    }

}