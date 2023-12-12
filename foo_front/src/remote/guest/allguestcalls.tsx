import { AppUtils } from "../../utils/appUtils";
import { postRequest, requestProp } from "../../remotes/utils/remote";



export const useRemoteLogin = (inputs: requestProp) => {
    const login = (ev: MouseEvent) => {
        ev.preventDefault();
        const form = AppUtils.parseForm(inputs);
        postRequest({ url: "account/login", data: form }).then(json => {
            if (inputs.callback !== undefined) {
                return inputs.callback(json);
            }
        }).catch(err => {
            if (inputs.error !== undefined) {
                return inputs.error(err);
            }

        });
    }
    return [login]

}
export const useRemoteRegister = (inputs: requestProp) => {
    const login = (ev: MouseEvent) => {
        ev.preventDefault();
        const form = AppUtils.parseForm(inputs);
        postRequest({ url: "create", data: form }).then(json => {
            console.log(json);
        }).catch(err => {
            console.log(err);
        });
    }
    return [login]

}