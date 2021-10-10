import { TeamID } from "./Team";
import { AccessToken, RefreshToken } from "./Tokens";

export interface TokensResponse {
	type: string;
	accessToken: AccessToken;
	refreshToken: RefreshToken;
}

export interface GetUserTeamsResponse {
	teams: TeamID[];
}
