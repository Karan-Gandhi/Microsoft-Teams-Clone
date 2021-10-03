import { AccessToken } from "../types/Tokens";
import { CookieNames, getCookie } from "../utils/BrowserUtils";

const accessTokenIsValid = (token: AccessToken): boolean => {
	return false;
};

export const userIsLoggedIn = (): boolean => {
	// check if refresh token is there and refresh toke is valid
	let accessToken: AccessToken = getCookie(CookieNames.ACCESS_TOKEN_COOKIE_NAME);

	if (!accessTokenIsValid(accessToken)) {
		try {
			accessToken = renewAccessToken();
		} catch {
			return false;
		}
	}

	return true;
};

export const loginWithEmailAndPassword = () => {
	// login with email and password and then add access token and refresh token to the cookie list
};

export const renewAccessToken = (): AccessToken => {
	// exchange the refresh token for a new access token and a refresh token
	return "";
};

export const createUserWithEmailAndPassword = () => {
	// create a new user with email and password
};

export const logout = () => {
	// logouts a user
};
