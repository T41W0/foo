import { requestProp } from "../remotes/utils/remote";


export class AppUtils {
    public static parseForm(input: requestProp): FormData {
        const form = new FormData();
        for (const i in input.data) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            const field = input.data[i];
            if (field instanceof File) {
                form.append(`${i}`, field);
            } else
                if ((!(field instanceof Object) && !(field instanceof Function)) && field !== "") {
                    form.append(`${i}`, field);
                }
        }
        return form;
    }



}