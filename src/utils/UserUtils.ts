import { fetchUsingGET } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { GetUserByIdResponse, SearchUserByEmailResponse } from "../api/Responses";
import User, { UserID } from "../types/User";
import { CookieNames, getCookie } from "./BrowserUtils";

export const getUserById = async (userID: UserID) =>
	(await fetchUsingGET<GetUserByIdResponse>(APIRoutes.GET_USER_BY_ID, [userID])).data;

export const searchUserByEmail = async (email: string, ignoreUsers?: User[]) =>
	!!ignoreUsers
		? (await fetchUsingGET<SearchUserByEmailResponse>(APIRoutes.SEARCH_USER_BY_EMAIL, [email])).data.results.filter(
				result => ignoreUsers?.findIndex(user => result.id === user.id) === -1
		  )
		: (await fetchUsingGET<SearchUserByEmailResponse>(APIRoutes.SEARCH_USER_BY_EMAIL, [email])).data.results;

export const getUserDetails = async () => await fetchUsingGET<GetUserByIdResponse>(APIRoutes.GET_USER_INFO);

export const getUserName = () => getCookie(CookieNames.USER_NAME_COOKIE_NAME);

export const getUserID = () => getCookie(CookieNames.USER_ID_COOKIE_NAME);

export const getUserEmail = () => getCookie(CookieNames.USER_EMAIL_COOKIE_NAME);
