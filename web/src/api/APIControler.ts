import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CookieNames, getCookie } from "../utils/BrowserUtils";
import APIRoutes from "./APIRoutes";

const AXIOS_REQUEST_TIMEOUT = 5000;

export const getAPIConfiguration = (noAuthorization?: boolean): AxiosRequestConfig => ({
	timeout: AXIOS_REQUEST_TIMEOUT,
	baseURL: "http://localhost:5000/",
	headers:
		(!noAuthorization && {
			Authorization: `${getCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME)} ${getCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME)}`,
		}) ||
		{},
});

export const fetchUsingPOST = async <T, U>(config: AxiosRequestConfig, route: APIRoutes, body: T, params?: string[]) =>
	await axios.post<T, AxiosResponse<U>>(route.concat(params?.join("") || ""), body, config);

export const fetchUsingGET = async <T>(config: AxiosRequestConfig, route: APIRoutes, params?: string[]) =>
	await axios.get<T>(route.concat(params?.join("") || ""), config);

export const fetchUsingPut = async <T, U>(config: AxiosRequestConfig, route: APIRoutes, body?: T, params?: string[]) =>
	await axios.put<T, AxiosResponse<U>>(route.concat(params?.join("") || ""), body, config);

export const fetchUsingDelete = async <T>(config: AxiosRequestConfig, route: APIRoutes, body?: T, params?: string[]) =>
	await axios.delete<T>(route.concat(params?.join("") || ""), { ...config, data: body });
