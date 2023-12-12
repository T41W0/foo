import { FC, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/guest/useAuth";
import { GetCategoryUseCase } from "../remotes/usecases/getcategoryusecase";
import { Header } from "../components/header";


export const AuthLayout: FC = () => {
    const [loading] = useAuth({ loading: true });
    const [category, setCategory] = useState(null);
    useEffect(() => {
        GetCategoryUseCase.execute().then(value => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            setCategory(value!.success ?? []);
        }).catch(err => {
            console.log(err);
        });
    }, []);

    if (loading) {
        return <span>loading...</span>
    }


    return <>
        <Header categorie={category ?? []} />
        <Outlet />
    </>
}