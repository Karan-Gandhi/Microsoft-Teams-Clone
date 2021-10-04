import axios from "axios";
import { CookieNames, getCookie } from "../utils/BrowserUtils";
import APIRoutes from "./APIRoutes";

const AXIOS_REQUEST_TIMEOUT = 5000;

const instance = axios.create({
	timeout: AXIOS_REQUEST_TIMEOUT,
	headers: { Authorization: `${getCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME)} ${getCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME)}` },
});

export const fetchUsingPOST = async <T, U>(route: APIRoutes, body: T, params?: string[]) =>
	await instance.post<T, U>(route.concat(params?.join("") || ""), body);

export const fetchUsingGET = async <T>(route: APIRoutes, params?: string[]) => await instance.get<unknown, T>(route.concat(params?.join("") || ""));

export const fetchUsingPut = async <T, U>(route: APIRoutes, body?: T, params?: string[]) =>
	await instance.put<T, U>(route.concat(params?.join("") || ""), body);

export const fetchUsingDelete = async <T>(route: APIRoutes, params?: string[]) => await instance.delete<T>(route);
