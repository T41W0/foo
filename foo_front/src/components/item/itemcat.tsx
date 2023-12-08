import { FC, ReactNode } from "react";

interface prop {
  prouct_image: string;
  discount: string;
  price: string;
  currency: string;
  icon: ReactNode;
  name: string;
  description: string;
}

export const Product: FC<prop> = (prop) => {
  return (
    <section className="bg-slate-600 w-1/2 px-5 py-5 relative">
      <section>
        <img src={prop.prouct_image} alt={prop.name.toString()} />
        <div className="flex flex-col items-center justify-center">
          <span>{prop.price}</span>
          {prop.icon}
          <span>{prop.name}</span>
          <span>{prop.description}</span>
        </div>
      </section>
      <span className="absolute top-0 right-0">{prop.discount}</span>
    </section>
  );
};
