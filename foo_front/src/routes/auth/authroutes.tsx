import { Route } from "react-router-dom";
import { AuthLayout } from "../../layouts/authlayout";
import { AuthHome } from "../../pages/auth/AuthHome";
import { CategoryPage } from "../../pages/auth/categorypage";
import { AddProduct } from "../../pages/admin/AddProduct";
import { AddCategory } from "../../pages/admin/AddCategory";
import { ViewProduct } from "../../pages/auth/viewproduct";


export const AuthRoutes = <Route path="/home" element={<AuthLayout />}>
    <Route path="" element={<AuthHome />}></Route>
    <Route path="category/:id" element={<CategoryPage />}></Route>
    <Route path="add/product" element={<AddProduct />} ></Route>
    <Route path="add/category" element={<AddCategory />} ></Route>
    <Route path="product/:id" element={<ViewProduct />} ></Route>
    <Route path="*" element={<>Not found</>}></Route>
</Route >;