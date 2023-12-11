import { Models } from "../utils/datacenter";

interface userProp {
    email: string,
    token: string,
}


export class UserModel extends Models implements userProp {
    public email: string;
    public token: string;
    private constructor(email: string, token: string) {
        super();
        this.email = email;
        this.token = token;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public static fromJson(data: any): UserModel {
        return new UserModel(data.email, data.token);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public toMap(): object {
        return { email: this.email, token: this.token };
    }
    public toString(): string {
        return `UserModel{email:${this.email},token:${this.token}}`;
    }


}