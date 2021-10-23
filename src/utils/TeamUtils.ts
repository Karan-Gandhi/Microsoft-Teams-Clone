import { fetchUsingDelete, fetchUsingGET, fetchUsingPOST, fetchUsingPut } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import {
  AddMemberToTeamRequest,
  CreateTeamRequest,
  JoinTeamRequest,
  RemoveUserFromTeamRequest,
  SendTeamMessageRequest,
} from "../api/Requests";
import { CreateTeamResponse, GetTeamMembersResponse, GetUserTeamsResponse } from "../api/Responses";
import Team, { TeamFeed, TeamID } from "../types/Team";
import User, { UserID } from "../types/User";

export const getUserTeams = async () => await fetchUsingGET<GetUserTeamsResponse>(APIRoutes.GET_TEAMS);

export const getTeamByID = async (teamID: TeamID) => await fetchUsingGET<Team>(APIRoutes.GET_TEAM_BY_ID, [teamID]);

export const getTeamFeed = async (teamID: TeamID) => await fetchUsingGET<TeamFeed>(APIRoutes.GET_TEAM_FEED, [teamID]);

export const sendMessageOnTeam = async (teamID: TeamID, message: string) =>
  await fetchUsingPOST<SendTeamMessageRequest, any>(APIRoutes.SEND_MESSAGE, { content: message }, [teamID]);

export const joinTeam = async (teamID: TeamID) => await fetchUsingPOST<JoinTeamRequest, any>(APIRoutes.JOIN_TEAM, { teamID });

export const createTeam = async (name: string, members: User[]) =>
  await fetchUsingPOST<CreateTeamRequest, CreateTeamResponse>(APIRoutes.CREATE_TEAM, {
    name,
    members: members.map((member) => member.id),
  });

export const getTeamMembers = async (teamID: TeamID) => await fetchUsingGET<GetTeamMembersResponse>(APIRoutes.GET_TEAM_MEMBERS, [teamID]);

export const addMemberToTeam = async (teamID: TeamID, userID: UserID) =>
  await fetchUsingPut<AddMemberToTeamRequest, any>(APIRoutes.ADD_USER_TO_TEAM, { userID }, [teamID]);

export const removeUserFromTeam = async (teamID: TeamID, userID: UserID) =>
  await fetchUsingDelete<RemoveUserFromTeamRequest>(APIRoutes.REMOVE_USER_FROM_TEAM, { userID }, [teamID]);
