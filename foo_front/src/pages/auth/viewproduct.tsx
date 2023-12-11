import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GeneralUsecase } from "../../remotes/usecases/usecases";


export const ViewProduct: FC = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);


    useEffect(() => {
        GeneralUsecase.fetchProduct(parseInt(`${id}`)).then(value => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setProduct(value!.success);
        })

    }, [id])


    return <div className="w-3/6 mx-auto border rounded-sm">
        <div className="px-4 mx-2 py-4 justify-center flex flex-col items-center">
            <img src={`${product && product!.photo}`} className={`h-64 w-4/6 object-contain object-center`} />
            <span>{product && product.name}</span>
            <span>{product && product.description}</span>
            <span>{product && product.price}</span>
            <button className="px-4 py-2 bg-rose-600 text-white rounded hover:bg-rose-700 transition-all duration-300">Buy Product</button>
        </div>

    </div>
}