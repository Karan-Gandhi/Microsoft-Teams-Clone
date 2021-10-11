import { TeamID } from "./Team";
import { RefreshToken } from "./Tokens";

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
