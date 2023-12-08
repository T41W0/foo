import { FC } from "react";
import { Category, CategoryProp } from "./category";

interface props {
  children: CategoryProp[];
}

export const ListCat: FC<props> = (props) => {
  return (
    <div className="block w-3/6">
      <ul className="flex justify-end gap-3">
        {props.children.map((category, index) => (
          <Category key={index} href={category.href} text={category.text} />
        ))}
      </ul>
    </div>
  );
};
