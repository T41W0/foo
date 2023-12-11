import { AppUtils } from '../../utils/appUtils';
import { postRequest, requestProp } from '../../remotes/utils/remote';

const compareMethod = (url: string, method: RequestMethod, input: requestPropq) => {
    const form = AppUtils.parseForm(input);
    switch (method) {
        case RequestMethod.POST:
        case RequestMethod.PUT:
            return postRequest({ url: url, data: form }).then(json => {
                return json;
            });
        case RequestMethod.DELETE:
        case RequestMethod.FETCH:
        case RequestMethod.GET:
    }
}


export abstract class DataResources<T>{
    protected method: RequestMethod = RequestMethod.GET;



    public constructor(inputs: requestProp, method: RequestMethod = RequestMethod.GET) {

    }


    public data(): T;

}




export abstract class DataKind<T extends DataResources, D extends DataResources>{


}