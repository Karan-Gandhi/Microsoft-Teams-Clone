import { RefreshToken } from "./Tokens";

export interface RenewAccessTokenRequest {
	refreshToken: RefreshToken;
}

export interface LoginRequest {
	email: string;
	password: string;
}
