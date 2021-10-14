import { fetchUsingGET, fetchUsingPOST } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { CreateTeamRequest, JoinTeamRequest, SendTeamMessageRequest } from "../types/Requests";
import { CreateTeamResponse, GetUserTeamsResponse } from "../types/Responses";
import Team, { TeamFeed, TeamID } from "../types/Team";
import User from "../types/User";

export const getUserTeams = async () => await fetchUsingGET<GetUserTeamsResponse>(APIRoutes.GET_TEAMS);

export const getTeamByID = async (teamID: TeamID) => await fetchUsingGET<Team>(APIRoutes.GET_TEAM_BY_ID, [teamID]);

export const getTeamFeed = async (teamID: TeamID) => await fetchUsingGET<TeamFeed>(APIRoutes.GET_TEAM_FEED, [teamID]);

export const sendMessageOnTeam = async (teamID: TeamID, message: string) =>
	await fetchUsingPOST<SendTeamMessageRequest, any>(APIRoutes.SEND_MESSAGE, { content: message }, [teamID]);

export const joinTeam = async (teamID: TeamID) =>
	await fetchUsingPOST<JoinTeamRequest, any>(APIRoutes.JOIN_TEAM, { teamID });

export const createTeam = async (name: string, members: User[]) =>
	await fetchUsingPOST<CreateTeamRequest, CreateTeamResponse>(APIRoutes.CREATE_TEAM, {
		name,
		members: members.map(member => member.id),
	});
