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

export type CreateTeamResponse = Team;

export type GetUserDetailsResponse = User;

export interface GetTeamMembersResponse {
	members: UserID[];
}
