import { Models } from "../utils/datacenter";

interface userProp {
    name: string,
}


export class ProductModel extends Models implements userProp {
    public name: string;
    public href: string;
    public price: string;
    public photo: string;
    public discount: string;
    private constructor(name: string, href: string, price: string, photo: string, discount: string) {
        super();
        this.name = name;
        this.href = href;
        this.price = price;
        this.photo = photo;
        this.discount = discount;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static fromJson(data: any): ProductModel {
        return new ProductModel(data.name, `product/${data.id}`, data.price, data.photo, data.discount);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public toMap(): object {
        return { name: this.name, href: this.href, price: this.price, photo: this.photo, discount: this.discount };
    }
    public toString(): string {
        return `ProductModel{name:${this.name},href:${this.href},price: ${this.price}, photo: ${this.photo}, discount: ${this.discount} }`;
    }


}