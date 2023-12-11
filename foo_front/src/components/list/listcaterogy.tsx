import { FC } from "react";
import { Category } from "./category";
import { CategoryModel } from "../../remotes/models/categorymodel";
import { Link } from "react-router-dom";

interface props {
  children: CategoryModel[];
}

export const ListCat: FC<props> = (props) => {
  return (
    <div className="flex justify-between w-3/6">
      <ul className="flex justify-end gap-3">
        {props.children.map((category, index) => (
          <Category key={index} href={`/home/${category.href}`} text={category.name} />
        ))}
      </ul>
      <Link to={"/home/add/product"}>Add Products</Link>
      <Link to={"/home/add/category"}>Add Category</Link>
    </div>
  );
};
