import {
	fetchUsingGET,
	fetchUsingPOST,
	getAPIConfiguration,
} from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { JoinTeamRequest, SendTeamMessageRequest } from "../types/Requests";
import { GetUserTeamsResponse } from "../types/Responses";
import Team, { TeamFeed, TeamID } from "../types/Team";

export const getUserTeams = async () =>
	await fetchUsingGET<GetUserTeamsResponse>(
		getAPIConfiguration(),
		APIRoutes.GET_TEAMS
	);

export const getTeamByID = async (teamID: TeamID) =>
	await fetchUsingGET<Team>(getAPIConfiguration(), APIRoutes.GET_TEAM_BY_ID, [
		teamID,
	]);

export const getTeamFeed = async (teamID: TeamID) =>
	await fetchUsingGET<TeamFeed>(
		getAPIConfiguration(),
		APIRoutes.GET_TEAM_FEED,
		[teamID]
	);

export const sendMessageOnTeam = async (teamID: TeamID, message: string) =>
	await fetchUsingPOST<SendTeamMessageRequest, any>(
		getAPIConfiguration(),
		APIRoutes.SEND_MESSAGE,
		{ content: message },
		[teamID]
	);

export const joinTeam = async (teamID: TeamID) =>
	await fetchUsingPOST<JoinTeamRequest, any>(
		getAPIConfiguration(),
		APIRoutes.JOIN_TEAM,
		{ teamID }
	);
