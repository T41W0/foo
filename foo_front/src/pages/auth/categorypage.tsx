import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FetchCategoryUseCase } from "../../remotes/usecases/fetchcategoryusecase";
import { CategoryModel } from "../../remotes/models/categorymodel";
import { Product } from "../../components/item/itemcat";
import { AiFillStar } from "react-icons/ai"


export const CategoryPage: FC = () => {
    const { id } = useParams();
    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        FetchCategoryUseCase.execute(parseInt(`${id}`)).then(value => {
            const data: CategoryModel | null = value.success ?? null;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setCategory(data);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setProducts(value.success?.products);
            setLoading(false);
        });
    }, [id])

    if (loading) {
        return <span>fetching products...</span>
    }

    return <div>

        {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            category && category!.name}

        <div className={`flex justify-around w-full mx-4`}>{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            products && products.map((product, i) => <Product key={i} href={product.href} icon={
                <span className="flex items-center justify-start w-9 text-rose-700">
                    <AiFillStar className="text-2xl font-bold " fontSize={20} />
                    <AiFillStar className="text-2xl font-bold " fontSize={20} />
                    <AiFillStar className="text-2xl font-bold " fontSize={20} />
                    <AiFillStar className="text-2xl font-bold " fontSize={20} />
                    <AiFillStar className="text-2xl font-bold " fontSize={20} />
                </span>
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
            } prouct_image={product.photo} name={product.name} discount={product.discount} price={product.price} currency="NGN" />)}
        </div>
    </div>

}