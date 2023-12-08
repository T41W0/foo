import { FC } from "react";
// import { Link } from "react-router-dom";

export interface CategoryProp {
  text: string;
  href: string;
}

export const Category: FC<CategoryProp> = (prop) => {
  return (
    <li className="px-4 py-2 bg-stone-300 text-stone-900">
      <a className="text-white" href={prop.href}>
        {prop.text}
      </a>
    </li>
  );
};
