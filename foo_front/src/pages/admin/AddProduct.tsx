import { FC, useRef, useState } from "react";
import { useForm } from "../../hooks/guest/useForm";
import { GeneralUsecase } from "../../remotes/usecases/usecases";
import { useCategory } from "../../hooks/auth/useCategory";


export const AddProduct: FC = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const [input, change, setInputs] = useForm({
        initialState: {}
    });
    const form = useRef();
    const [err, setErr] = useState(null);
    const [loading, data, error] = useCategory();

    if (loading) {
        return <span>loading category...</span>
    }

    return <form
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        ref={form} className="flex flex-col justify-start w-3/6 h-full gap-3 px-2 py-1 mx-auto bg-white rounded-md">
        <h6>Add Product</h6>
        <h6>{err || error}</h6>
        <label>Product Name</label>
        <input onChange={change} name="name" type="text" className="px-4 py-1 border rounded-md" placeholder="Product Name" />
        <label>Product Category</label>
        <select onChange={(ev) => {

           setInputs({ ...input, "category": ev.target.value })
        }} name="category" className="px-4 py-1 border rounded-md" >
            <option selected value={""}>Select Category</option>
            {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                data && data.map((e, i) => {
                    return <option key={i} value={e.id}>{`${e.name}`.toUpperCase()}</option>
                })}
        </select>
        <label>Product Price</label>
        <input onChange={change} name="price" type="number" className="px-4 py-1 border rounded-md" placeholder="Product Price" />
        <label>Product Discount</label>
        <input onChange={change} name="discount" type="number" className="px-4 py-1 border rounded-md" placeholder="Product discount eg 21" />
        <label>Product Photo</label>
        <input onChange={(ev) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setInputs({ ...input, "photo": ev.target!.files[0] })
        }} name="photo" type="file" className="px-4 py-1 border rounded-md" />

        <button onClick={(ev) => {
            ev.preventDefault();
            GeneralUsecase.addProduct(input).then(value => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                form!.current!.reset();
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                alert(` ${value!.success!.name} added`);
            }).catch(value => {
                setErr(value.message);
            });
        }} className="px-4 py-2 font-sans text-white rounded-md bg-rose-600">Add Product</button>
    </form>
}