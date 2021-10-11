import { TeamID } from "./Team";
import { AccessToken, RefreshToken } from "./Tokens";
import { UserID } from "./User";

export interface TokensResponse {
	type: string;
	accessToken: AccessToken;
	refreshToken: RefreshToken;
}

export interface GetUserTeamsResponse {
	teams: TeamID[];
}

export interface GetUserByIdResponse {
	name: string;
	id: UserID;
	email: string;
}
