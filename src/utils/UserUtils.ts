import { fetchUsingGET } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { GetUserByIdResponse, SearchUserByEmailResponse } from "../types/Responses";
import { UserID } from "../types/User";

export const getUserById = async (userID: UserID) =>
	await fetchUsingGET<GetUserByIdResponse>(APIRoutes.GET_USER_BY_ID, [userID]);

// TODO: complete this thing
export const searchUserByEmail = async (email: string) =>
	(await fetchUsingGET<SearchUserByEmailResponse>(APIRoutes.SEARCH_USER_BY_EMAIL, [email])).data.results;
