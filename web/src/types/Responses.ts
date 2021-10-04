import { AccessToken, RefreshToken } from "./Tokens";

export interface RenewAccessTokenResponse {
	type: string;
	accessToken: AccessToken;
	refreshToken: RefreshToken;
}

export interface LoginResponse {
	type: string;
	accessToken: AccessToken;
	refreshToken: RefreshToken;
}
