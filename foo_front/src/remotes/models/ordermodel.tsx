import { Models } from "../utils/datacenter";

interface userProp {
    orderId: string,
}


export class OrderModel extends Models implements userProp {
    public orderId: string;
    public href: string;
    private constructor(orderId: string, href: string) {
        super();
        this.orderId = orderId;
        this.href = href;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static fromJson(data: any): OrderModel {
        return new OrderModel(data.orderId, `order/${data.id}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public toMap(): object {
        return { orderId: this.orderId, href: this.href };
    }
    public toString(): string {
        return `OrderModel{orderId:${this.orderId},href:${this.href}}`;
    }


}