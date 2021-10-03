import User from "../types/User";
import { AccessTokenTypes } from "../types/AccessToken";
export declare const loginWithEmailAndPassword: (email: string, password: string) => Promise<{
    token: string;
    type: AccessTokenTypes;
}>;
export declare const createUserWithEmailAndPassword: (name: string, email: string, password: string) => Promise<{
    token: string;
    type: AccessTokenTypes;
}>;
export declare const getAccessToken: (user: User) => {
    token: string;
    type: AccessTokenTypes;
};
