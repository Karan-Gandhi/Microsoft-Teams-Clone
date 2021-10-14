import Team, { TeamID } from "./Team";
import { AccessToken, RefreshToken } from "./Tokens";
import User, { UserID } from "./User";

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

export interface SearchUserByEmailResponse {
	results: User[];
}

export interface CreateTeamResponse extends Team {}
