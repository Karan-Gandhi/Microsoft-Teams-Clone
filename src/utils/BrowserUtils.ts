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

export const makeNumberTwoDigit = (x: number) => {
	if (x.toString().length === 1) {
		return "0" + x;
	}
	return x;
};

export const getFormattedDate = (dateCreated: number) => {
	const date = new Date(dateCreated);
	return `${makeNumberTwoDigit(date.getDate())}/${makeNumberTwoDigit(
		date.getMonth()
	)}/${makeNumberTwoDigit(date.getFullYear())}, ${makeNumberTwoDigit(
		date.getHours()
	)}:${makeNumberTwoDigit(date.getMinutes())}`;
};
