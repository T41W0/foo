import { FC, useEffect, } from "react";
import { Outlet } from "react-router-dom";
import { AccountState } from "../states/accountstate";
import { useAuth } from "../hooks/guest/useAuth";


export const GuestLayout: FC = () => {
    const [loading, account, setAccount] = useAuth({ loading: true });


    useEffect(() => {

    }, [])


    if (loading) {
        return <span>loading...</span>
    }

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
    return !account.isLogin &&
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
        <AccountState.Provider value={{ account, setAccount }}> <div className="flex items-center justify-center h-screen px-4 py-2 my-0">
            <div className="w-3/6 rounded-md bg-violet-500 h-4/6">
                <h1 className="flex items-center justify-center w-full py-2 my-4 font-sans text-4xl text-white h-3/6">Welcome to Our Store</h1>
                <div className="flex justify-around w-4/6 gap-3 mx-auto"><Outlet /></div>

            </div>
        </div></AccountState.Provider>
}