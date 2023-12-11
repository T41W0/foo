import { Route } from "react-router-dom";
import { GuestLayout } from "../../layouts/guestlayout";
import { Login } from "../../pages/guest/login";
import { Signup } from "../../pages/guest/signup";
import { GuestHome } from "../../pages/guest/home";


export const GuestRoutes = <Route path="/" element={<GuestLayout />}>
    <Route path="" element={<GuestHome />}></Route>
    <Route path="account/login" element={<Login />}></Route>
    <Route path="account/signup" element={<Signup />}></Route>
</Route>
    ;