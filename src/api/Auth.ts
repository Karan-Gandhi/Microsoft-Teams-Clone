import { AccessToken, RefreshToken } from "../types/Tokens";
import { CookieNames, getCookie, removeCookie, setCookie } from "../utils/BrowserUtils";
import { getUserDetails } from "../utils/UserUtils";
import { CreateUserRequest, LoginRequest, LogoutRequest, RenewAccessTokenRequest } from "./Requests";
import { TokensResponse } from "./Responses";
import { fetchUsingDelete, fetchUsingGET, fetchUsingPOST } from "./APIControler";
import { NO_INTERNET, REFRESH_TOKEN_EXPIRED } from "./AuthErrors";
import APIRoutes from "./APIRoutes";

export const accessTokenIsValid = async (): Promise<boolean> => {
  if (!getCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME)) return false;
  try {
    await fetchUsingGET<string>(APIRoutes.VERIFY_ACCESS_TOKEN, [], true);
    return true;
  } catch {
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

export const setUserDetails = async () => {
  const { data: user } = await getUserDetails();
  setCookie(CookieNames.USER_ID_COOKIE_NAME, user.id);
  setCookie(CookieNames.USER_NAME_COOKIE_NAME, user.name);
  setCookie(CookieNames.USER_EMAIL_COOKIE_NAME, user.email);
};

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  // login with email and password and then add access token and refresh token to the cookie list
  if (await userIsLoggedIn()) return true;

  try {
    const { data } = await fetchUsingPOST<LoginRequest, TokensResponse>(APIRoutes.LOGIN, { email, password }, [], true);
    setCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME, data.accessToken as string);
    setCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME, data.refreshToken as string);
    setCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME, data.type);
    await setUserDetails();
    return true;
  } catch (error) {
    throw error;
  }
};

export const renewAccessToken = async (): Promise<AccessToken> => {
  // exchange the refresh token for a new access token and a refresh token
  const refreshToken: RefreshToken = getCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME);
  if (!refreshToken) {
    throw REFRESH_TOKEN_EXPIRED;
  }

  try {
    const { data } = await fetchUsingPOST<RenewAccessTokenRequest, TokensResponse>(
      APIRoutes.RENEW_ACCESS_TOKEN,
      { refreshToken },
      [],
      true
    );
    setCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME, data.accessToken as string);
    setCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME, data.refreshToken as string);
    setCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME, data.type);
    return data.accessToken;
  } catch {
    throw REFRESH_TOKEN_EXPIRED;
  }
};

export const createUserWithEmailAndPassword = async (name: string, email: string, password: string) => {
  // create a new user with email and password
  if (await userIsLoggedIn()) return;

  try {
    const { data } = await fetchUsingPOST<CreateUserRequest, TokensResponse>(APIRoutes.CREATE_USER, { name, email, password }, [], true);
    setCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME, data.accessToken as string);
    setCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME, data.refreshToken as string);
    setCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME, data.type);
    await setUserDetails();
    return true;
  } catch (error: any) {
    if (error.message === "Network Error") throw NO_INTERNET;
    throw new Error(error.response.data.message);
  }
};

export const logout = async () => {
  // logouts a user
  try {
    await fetchUsingDelete<LogoutRequest>(APIRoutes.LOGOUT, { refreshToken: getCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME) }, [], true);

    removeCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME);
    removeCookie(CookieNames.ACCESS_TOKEN_TYPE_COOKIE_NAME);
    removeCookie(CookieNames.REFRESH_TOKEN_COOKIE_NAME);
    removeCookie(CookieNames.USER_ID_COOKIE_NAME);
    removeCookie(CookieNames.USER_NAME_COOKIE_NAME);
    removeCookie(CookieNames.USER_EMAIL_COOKIE_NAME);
  } catch (error) {
    throw error;
  }
};

export const getAccessToken = () => getCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME);
