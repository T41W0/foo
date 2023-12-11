import { FC, useContext, useState } from "react";
import { useForm } from "../../hooks/guest/useForm";
//import { useRemoteLogin } from "../../remote/guest/allguestcalls";
import { LoginUseCase } from "../../remotes/usecases/loginusecase";
import { AccountState } from "../../states/accountstate";


export const Login: FC = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const [input, change] = useForm({
        initialState: {}
    });
    const [err, setErr] = useState(null);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { acccount, setAccount } = useContext(AccountState);

    //    const [login] = useRemoteLogin(input);

    return <form className="flex flex-col justify-start w-full h-full gap-3 px-2 py-1 bg-white rounded-md">
        <h6>Login</h6>
        {err !== null && <h6>{err}</h6>}
        <label>Email</label>
        <input onChange={change} name="email" type="email" className="px-4 py-1 border rounded-md" placeholder="Email Address" />
        <label>Password</label>
        <input onChange={change} name="password" type="password" className="px-4 py-1 border rounded-md" placeholder="Password" />

        <button className="px-4 py-2 font-sans text-white rounded-md bg-rose-600"

            onClick={(ev) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                LoginUseCase.execute(ev, input).then(value => {
                    if (value.success) {
                        const data = value.success;
                        localStorage.setItem("token", data!.token);
                        setAccount({ ...acccount, isLogin: true });

                    }
                }).catch((err) => {
                    setErr(err.message);
                });
            }}>Sign in</button>

    </form>
}