import { Models } from "../utils/datacenter";

interface userProp {
    message: string,
}


export class AuthModel extends Models implements userProp {
    public message: string;
    private constructor(message: string,) {
        super();
        this.message = message;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static fromJson(data: any): AuthModel {
        return new AuthModel(data.message);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public toMap(): object {
        return { message: this.message };
    }
    public toString(): string {
        return `AuthModel{message:${this.message}}`;
    }


}