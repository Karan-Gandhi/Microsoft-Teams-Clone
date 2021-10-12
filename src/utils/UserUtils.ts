import { fetchUsingGET } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { GetUserByIdResponse } from "../types/Responses";
import { UserID } from "../types/User";

export const getUserById = async (userID: UserID) =>
	await fetchUsingGET<GetUserByIdResponse>(APIRoutes.GET_USER_BY_ID, [userID]);
