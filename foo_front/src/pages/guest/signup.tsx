import { FC,useState,useContext } from "react";
import { useForm } from "../../hooks/guest/useForm";
import { SignupUseCase } from "../../remotes/usecases/signupusecase";
import { AccountState } from "../../states/accountstate";

export const Signup: FC = () => {
    const [loading,setLoading]=useState(false);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const [input, change] = useForm({
        initialState: {}
    });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { acccount, setAccount } = useContext(AccountState);
    
    if(loading){
        return <span>creating account...</span>
    }

    return <form className="flex flex-col justify-start w-full h-full gap-3 px-2 py-1 bg-white rounded-md">
        <h6>Signup</h6>
        <label>Email</label>
        <input type="email" tabIndex={-1} onChange={change} name="email" className="px-4 py-1 border rounded-md" placeholder="Email Address" />
        <label>Password</label>
        <input type="password" tabIndex={-1} onChange={change} name="password" className="px-4 py-1 border rounded-md" placeholder="Password" />
        <button
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            onClick={(ev)=>{
                setLoading(true);
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore
                SignupUseCase.execute(ev,input).then(value=>{
                    const data = value.success;
                    localStorage.setItem("token", data!.token);
                    setAccount({ ...acccount, isLogin: true });
                    setLoading(false);

                }).catch(value=>{
                    alert(value.message);
                    setLoading(false);
                });
            }} className="px-4 py-2 font-sans text-white rounded-md bg-rose-600">Sign up</button>
    </form>
}