import User from "../types/User";
import { AccessToken, AccessTokenTypes, RefreshToken } from "../types/Tokens";
export declare const loginWithEmailAndPassword: (email: string, password: string) => Promise<{
    refreshToken: string;
    type: AccessTokenTypes;
    accessToken: string;
}>;
export declare const createUserWithEmailAndPassword: (name: string, email: string, password: string) => Promise<{
    refreshToken: string;
    type: AccessTokenTypes;
    accessToken: string;
}>;
export declare const getAccessToken: (user: User) => AccessToken;
export declare const getRefreshToken: (user: User) => RefreshToken;
export declare const revokeRefreshToken: (token: RefreshToken) => void;
//# sourceMappingURL=AuthUtils.d.ts.map