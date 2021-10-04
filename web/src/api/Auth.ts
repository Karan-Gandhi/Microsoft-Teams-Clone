import { CreateUserRequest, LoginRequest, RenewAccessTokenRequest } from "../types/Requests";
import { TokensResponse } from "../types/Responses";
import { AccessToken, RefreshToken } from "../types/Tokens";
import { CookieNames, getCookie, setCookie } from "../utils/BrowserUtils";
import { fetchUsingGET, fetchUsingPOST } from "./APIControler";
import { REFRESH_TOKEN_EXPIRED } from "./AuthErrors";
import APIRoutes from "./APIRoutes";

export const accessTokenIsValid = async (token: AccessToken): Promise<boolean> => {
	if (!token) return false;

	try {
		await fetchUsingGET<string>(APIRoutes.VERIFY_ACCESS_TOKEN);
		return true;
	} catch (e) {
		return false;
	}
};

export const userIsLoggedIn = async (): Promise<boolean> => {
	// check if refresh token is there and refresh toke is valid
	let accessToken: AccessToken = getCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME);

	if (!(await accessTokenIsValid(accessToken))) {
		try {
			accessToken = await renewAccessToken();
		} catch {
			return false;
		}
	}

	return true;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
	// login with email and password and then add access token and refresh token to the cookie list
	try {
		const data = await fetchUsingPOST<LoginRequest, TokensResponse>(APIRoutes.LOGIN, { email, password });
		setCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME, data.accessToken as string);
		setCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME, data.refreshToken as string);
		setCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME, data.type);
		return true;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const renewAccessToken = async (): Promise<AccessToken> => {
	// exchange the refresh token for a new access token and a refresh token
	const refreshToken: RefreshToken = getCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME);
	if (!refreshToken) throw REFRESH_TOKEN_EXPIRED;

	try {
		const data = await fetchUsingPOST<RenewAccessTokenRequest, TokensResponse>(APIRoutes.RENEW_ACCESS_TOKEN, { refreshToken });
		setCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME, data.accessToken as string);
		setCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME, data.refreshToken as string);
		setCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME, data.type);
		return data.accessToken;
	} catch (error) {
		throw REFRESH_TOKEN_EXPIRED;
	}
};

export const createUserWithEmailAndPassword = async (name: string, email: string, password: string) => {
	// create a new user with email and password
	try {
		const data = await fetchUsingPOST<CreateUserRequest, TokensResponse>(APIRoutes.CREATE_USER, { name, email, password });
		setCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME, data.accessToken as string);
		setCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME, data.refreshToken as string);
		setCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME, data.type);
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const logout = () => {
	// logouts a user
};
