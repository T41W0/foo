import { Models } from "../utils/datacenter";
import { ProductModel } from "./productmodel";


export class CategoryModel extends Models {
    public name: string;
    public id: number;
    public href: string;
    public products: ProductModel[];
    private constructor(name: string, href: string, id: number, products: ProductModel[]) {
        super();
        this.name = name;
        this.href = href;
        this.id = id;
        this.products = products;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static fromJson(data: any): CategoryModel {
        const products: ProductModel[] = [];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        data && data.products && data!.products!.forEach((product) => {
            products.push(ProductModel.fromJson(product));
        });
        return new CategoryModel(data.name, `category/${data.id}`, data.id, products);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public toMap(): object {
        return { name: this.name, href: this.href, id: this.id };
    }
    public toString(): string {
        return `CategoryModel{name:${this.name},href:${this.href},id:${this.id}}`;
    }


}