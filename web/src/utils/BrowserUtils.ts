import Cookies from "js-cookie";

export enum CookieNames {
	ACCESS_TOKEN_COOKIE_NAME = "access_token",
	REFRESH_TOKEN_COOKIE_NAME = "refresh_token",
}

export const setCookie = (name: CookieNames, value: string) => Cookies.set(name, value);

export const removeCookie = (name: CookieNames) => Cookies.remove(name);

export const getCookie = (name: CookieNames) => Cookies.get(name);
