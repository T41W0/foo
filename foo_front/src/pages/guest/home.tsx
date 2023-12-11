import { FC } from "react";
import { Link } from "react-router-dom";


export const GuestHome: FC = () => {
    return <><Link to={"/account/signup"} className="flex justify-center w-3/6 px-2 py-1 transition-all duration-300 rounded-md bg-slate-600 hover:bg-slate-800" >Create Account</Link>
        <Link to={"/account/login"} className="flex justify-center w-3/6 px-2 py-1 transition-all duration-300 rounded-md bg-slate-600 hover:bg-slate-800">Login</Link>
    </>


}