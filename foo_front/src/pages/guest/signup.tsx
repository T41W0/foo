import { FC } from "react";
import { useRemoteRegister } from '../../remote/guest/allguestcalls';
import { useForm } from "../../hooks/guest/useForm";

export const Signup: FC = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const [input, change] = useForm({
        initialState: {}
    });
    const [login] = useRemoteRegister(input);

    return <form className="flex flex-col justify-start w-full h-full gap-3 px-2 py-1 bg-white rounded-md">
        <h6>Signup</h6>
        <label>Email</label>
        <input type="email" tabIndex={-1} onChange={change} name="email" className="px-4 py-1 border rounded-md" placeholder="Email Address" />
        <label>Password</label>
        <input type="password" tabIndex={-1} onChange={change} name="password" className="px-4 py-1 border rounded-md" placeholder="Password" />
        <button
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onClick={login} className="px-4 py-2 font-sans text-white rounded-md bg-rose-600">Sign up</button>
    </form>
}