import { fetchUsingGET, getAPIConfiguration } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { GetUserTeamsResponse } from "../types/Responses";
import Team, { TeamID } from "../types/Team";

export const getUserTeams = async () => {
	return await fetchUsingGET<GetUserTeamsResponse>(
		getAPIConfiguration(),
		APIRoutes.GET_TEAMS
	);
};

export const getTeamByID = async (teamID: TeamID) => {
	return await fetchUsingGET<Team>(
		getAPIConfiguration(),
		APIRoutes.GET_TEAM_BY_ID,
		[teamID]
	);
};
