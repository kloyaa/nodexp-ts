interface IAuthProperties {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    device: any;
}

export type TAuthLogin = Pick<IAuthProperties, "username" | "password" | "device">;

