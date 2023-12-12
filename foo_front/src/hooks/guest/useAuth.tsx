import { useEffect, useState } from "react"
import { AuthUseCase } from "../../remotes/usecases/authusecase";
import { useNavigate } from "react-router-dom";

interface prop {
    loading?: boolean,
    showGuest?: boolean
}


export const useAuth = (props: prop) => {

    const [account, setAccount] = useState({ isLogin: false, loginUser: {}, profile: {} })
    const [loading, setLoading] = useState(props.loading ?? false);
    const navigate = useNavigate();

    useEffect(() => {
        AuthUseCase.execute().then(value => {
            if (value!.success !== undefined) {
                setAccount({ ...account, isLogin: true });
                if (props.showGuest) {
                    navigate("/home");
                }
            } else if (value!.err !== undefined) {
                const error = `${value!.err!.message}`.toLowerCase();
                if (error === "unauthenticated.") {
                    alert("you must login first")
                    setAccount({ ...account, isLogin: false });
                    navigate("/");
                }

            }
            setLoading(false);

        });

    }, []);

    return [loading, account, setAccount];

}