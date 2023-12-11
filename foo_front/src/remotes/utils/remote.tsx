import axios, { AxiosResponse } from "axios"
import { BaseUrl } from "../config";
import { AppUtils } from "../../utils/appUtils";

export interface requestProp {
    url?: string,
    data?: object,
    id?: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback?: (json: any) => any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: (json: any, status?: number) => any
}


export const postRequest = (prop: requestProp) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [data, setData] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return axios.post(`${BaseUrl}api/${prop.url}`, AppUtils.parseForm(prop)).then((value: AxiosResponse<any, any>) => {

        const json = value.data;
        if (prop.callback !== undefined) {
            return prop.callback(json);
        }
        return json;
        // setData(json);
    }).catch((err) => {
        if (prop.error !== undefined) {
            return prop.error(err!.response ?? { message: "something went wrong" }, err!.status);
        }
        return err;
    });


}

export const getRequest = (prop: requestProp) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [data, setData] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return axios.get(`${BaseUrl}api/${prop.url}`).then((value: AxiosResponse<any, any>) => {
        const json = value.data;
        if (prop.callback !== undefined) {
            return prop.callback(json);
        }
        return json;
        // setData(json);
    }).catch((err) => {
        if (prop.error !== undefined) {
            return prop.error(err!.response ?? { message: "something went wrong" }, err!.status);
        }
        return err;
    });


}



export const deleteRequest = (prop: requestProp) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const [data, setData] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return axios.delete(`${BaseUrl}api/${prop.url}`).then((value: AxiosResponse<any, any>) => {
        const json = value.data;
        if (prop.callback !== undefined) {
            return prop.callback(json);
        }
        return json;
        // setData(json);
    }).catch((err) => {
        if (prop.error !== undefined) {
            return prop.error(err!.response ?? { message: "something went wrong" }, err!.status);
        }
        return err;
    });


}
