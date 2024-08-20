export interface Usuario {
    _id?: string;
    nickname: string;
    email: string;
    password?: string;
    avatar: string;
    me?: boolean;
    role: string;
}

export interface UserLogin {
    email: string;
    password: string;
}
