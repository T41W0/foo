import { FC, useState } from "react"



interface prop {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState: any
}

export const useForm: FC<prop> = (prop) => {
    const [inputs, setInputs] = useState(prop.initialState);

    const change = (ev: MouseEvent) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const target: EventTarget = ev.target;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        setInputs({ ...inputs, [target.name]: target.value });
    }

    return [inputs, change, setInputs]

}