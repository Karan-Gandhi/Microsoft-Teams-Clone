import { TeamID } from "./Team";
import { RefreshToken } from "./Tokens";
import { UserID } from "./User";

export interface RenewAccessTokenRequest {
	refreshToken: RefreshToken;
}

export interface LoginRequest {
	email: string;
	password: string;
}

export interface CreateUserRequest {
	name: string;
	email: string;
	password: string;
}

export interface LogoutRequest {
	refreshToken: RefreshToken;
}

export interface SendTeamMessageRequest {
	content: string;
}

export interface JoinTeamRequest {
	teamID: TeamID;
}

export interface CreateTeamRequest {
	name: string;
	members: UserID[];
}
