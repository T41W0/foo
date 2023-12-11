import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";


interface prop {
  prouct_image: string;
  discount: string;
  price: string;
  currency: string;
  icon: ReactNode;
  name: string;
  href: string,
  description: string;
}

export const Product: FC<prop> = (prop) => {
  return (
    <Link to={`/home/${prop.href}`} className="relative flex justify-center w-1/12 h-64 px-2 border rounded-md card hover:shadow-md">
      <section className="flex flex-col items-start justify-center w-full">
        <img className={"p-1 h-40 object-cover object-center w-full mx-auto"} src={prop.prouct_image} alt={prop.name.toString()} />
        <div className="flex flex-col items-center justify-center">
          <span className="px-4 font-sans font-bold">{prop.currency}{prop.price}</span>
          <span className="font-sans text-2xl font-bold">{prop.icon}</span>
          <span className="px-4 font-sans text-sm font-bold">{prop.name.substring(0, 12)}</span>
        </div>
      </section>
      <span className="absolute top-0 right-0 flex items-center justify-center p-1 font-sans text-xs font-bold text-white rounded-full bg-rose-600">-{prop.discount}%</span>
    </Link>
  );
};
