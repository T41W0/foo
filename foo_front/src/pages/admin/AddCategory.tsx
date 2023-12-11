import { FC, useRef, useState } from "react";
import { useForm } from "../../hooks/guest/useForm";
import { GeneralUsecase } from "../../remotes/usecases/usecases";


export const AddCategory: FC = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const [input, change] = useForm({
        initialState: {}
    });
    const form = useRef();
    const [err, setErr] = useState(null);


    return <form
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref={form} className="flex flex-col justify-start w-3/6 h-full gap-3 px-2 py-1 mx-auto bg-white rounded-md">
        <h6>Add Category</h6>
        <h6>{err}</h6>
        <label>Category Name</label>
        <input onChange={change} name="name" type="text" className="px-4 py-1 border rounded-md" placeholder="Product Name" />
        <button onClick={(ev) => {
            ev.preventDefault();
            GeneralUsecase.addCategory(input).then(value => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                form!.current!.reset();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                alert(` ${value!.success!.name} added`);
            }).catch(value => {
                setErr(value.message);
            });
        }} className="px-4 py-2 font-sans text-white rounded-md bg-rose-600">Add Category</button>
    </form>
}