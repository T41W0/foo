import { FC } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/guest/useAuth";


export const AdminLayout: FC = () => {
    const [loading] = useAuth({ loading: true });

    if (loading) {
        return <span>loading...</span>
    }


    return <>
        <Outlet />
    </>
}