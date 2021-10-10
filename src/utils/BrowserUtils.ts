import Cookies from "js-cookie";

export enum CookieNames {
	ACCESS_TOKEN_COOKIE_NAME = "access_token",
	REFRESH_TOKEN_COOKIE_NAME = "refresh_token",
	ACCESS_TOKEN_TYPE_COOKIE_NAME = "access_token_type",
}

export const setCookie = (name: CookieNames, value: string) =>
	Cookies.set(name, value);

export const removeCookie = (name: CookieNames) => Cookies.remove(name);

export const getCookie = (name: CookieNames) => Cookies.get(name);

export const getFormattedDate = (dateCreated: number) => {
	const date = new Date(dateCreated);
	return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`;
};
