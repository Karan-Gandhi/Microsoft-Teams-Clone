import { CreateUserRequest, LoginRequest, LogoutRequest, RenewAccessTokenRequest } from "../types/Requests";
import { TokensResponse } from "../types/Responses";
import { AccessToken, RefreshToken } from "../types/Tokens";
import { CookieNames, getCookie, removeCookie, setCookie } from "../utils/BrowserUtils";
import { fetchUsingDelete, fetchUsingGET, fetchUsingPOST, getAPIConfiguration } from "./APIControler";
import { REFRESH_TOKEN_EXPIRED } from "./AuthErrors";
import APIRoutes from "./APIRoutes";

export const accessTokenIsValid = async (): Promise<boolean> => {
	if (!getCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME)) return false;

	try {
		await fetchUsingGET<string>(getAPIConfiguration(), APIRoutes.VERIFY_ACCESS_TOKEN);
		return true;
	} catch (e) {
		return false;
	}
};

export const userIsLoggedIn = async (): Promise<boolean> => {
	// check if refresh token is there and refresh toke is valid
	if (!(await accessTokenIsValid())) {
		try {
			await renewAccessToken();
			return await accessTokenIsValid();
		} catch {
			return false;
		}
	}
	return true;
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
	// login with email and password and then add access token and refresh token to the cookie list
	if (await userIsLoggedIn()) return true;

	try {
		const { data } = await fetchUsingPOST<LoginRequest, TokensResponse>(getAPIConfiguration(), APIRoutes.LOGIN, { email, password });
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
		const { data } = await fetchUsingPOST<RenewAccessTokenRequest, TokensResponse>(getAPIConfiguration(), APIRoutes.RENEW_ACCESS_TOKEN, {
			refreshToken,
		});
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
	if (await userIsLoggedIn()) return;

	try {
		const { data } = await fetchUsingPOST<CreateUserRequest, TokensResponse>(getAPIConfiguration(), APIRoutes.CREATE_USER, { name, email, password });
		setCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME, data.accessToken as string);
		setCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME, data.refreshToken as string);
		setCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME, data.type);
	} catch (error: any) {
		throw new Error(error.response.data.message);
	}
};

export const logout = async () => {
	// logouts a user
	try {
		await fetchUsingDelete<LogoutRequest>(getAPIConfiguration(), APIRoutes.LOGOUT, {
			refreshToken: getCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME),
		});
		removeCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME);
		removeCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME);
		removeCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME);
	} catch (error) {
		console.log(error);
		throw error;
	}
};
