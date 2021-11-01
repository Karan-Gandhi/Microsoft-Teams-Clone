import { TeamID } from "../types/Team";
import { RefreshToken } from "../types/Tokens";
import { UserID } from "../types/User";

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

export interface AddMemberToTeamRequest {
  userID: UserID;
}

export interface RemoveUserFromTeamRequest {
  userID: UserID;
}

export interface CreateMeetingRequest {
  name: string;
  time: number;
  teamID: TeamID;
}
