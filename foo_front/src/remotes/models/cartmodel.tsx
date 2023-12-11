import { Models } from "../utils/datacenter";

interface userProp {
    name: string,
}


export class CartModel extends Models implements userProp {
    public name: string;
    public href: string;
    public items: string[];
    public total: string;
    public transactionId: string;
    private constructor(name: string, href: string, items: string[], total: string, transactionId: string) {
        super();
        this.name = name;
        this.href = href;
        this.items = items;
        this.total = total;
        this.transactionId = transactionId;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static fromJson(data: any): CartModel {
        return new CartModel(data.name, `cart/${data.id}`, data.items, data.total, data.transactionId);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public toMap(): object {
        return { name: this.name, href: this.href, items: this.items, total: this.total, transactionId: this.transactionId };
    }
    public toString(): string {
        return `CartModel{name:${this.name},href:${this.href}, items:${this.items}, total: ${this.total}, transactionId: ${this.transactionId}  }`;
    }


}