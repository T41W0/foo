import { useEffect, useState } from "react"
import { GeneralUsecase } from "../../remotes/usecases/usecases";

export const useCategory = (start: boolean = true) => {
    const [data, setData] = useState(null);
    const [error, setErr] = useState("");
    const [loading, setLoading] = useState(start);

    useEffect(() => {
        if (start) {
            GeneralUsecase.getUserCategory().then(value => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                setData(value.success);
                setLoading(false);
            }).catch(value => {
                setErr(value.message);
                setLoading(false);
            });
        }
    }, [start]);


    return [loading, data, error];
}