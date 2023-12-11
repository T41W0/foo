import { FC } from "react";
import { CategoryModel } from "../remotes/models/categorymodel";
import { ListCat } from "./list/listcaterogy";
import { Link } from "react-router-dom";

interface prop {
    categorie: CategoryModel[]
}

export const Header: FC<prop> = ({ categorie }) => {

    return <div className="w-full h-16 px-4 py-2 bg-green-500">
        <div className="flex justify-between w-full">
            <Link to={"/home"} className="w-2/6 font-sans text-2xl text-white">Store</Link>
            <ListCat children={categorie} />
        </div>
    </div>

}