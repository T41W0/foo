import { Route } from "react-router-dom";
import { AdminLayout } from "../../layouts/adminlayout";
import { AdminHome } from "../../pages/admin/AdminHome";


export const AdminRoutes = <Route path="/admin" element={<AdminLayout />}>
    <Route path="" element={<AdminHome />}></Route>
    <Route path="*" element={<>Not found</>}></Route>
</Route>;