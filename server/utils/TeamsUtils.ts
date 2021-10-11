import { v4 } from "uuid";
import { addData, readData } from "../services/Firestore";
import FeedItem, { FeedType } from "../types/FeedItem";
import FirestoreCollections from "../types/FirestoreCollections";
import { MeetingMessage } from "../types/Meeting";
import Message from "../types/Message";
import Team, { TeamFeed, TeamID } from "../types/Team";
import User, { UserID } from "../types/User";
import { userJoinTeam } from "./UserUtils";

const NO_SUCH_TEAM_EXISTS = new Error("No such team exists");

export const createTeam = async (
	name: string,
	admin: UserID,
	members: UserID[]
): Promise<Team> => {
	const team: Team = {
		id: v4(),
		name,
		admin,
		members: [...members, admin],
	};

	await userJoinTeam(team.id, admin);

	// update database
	await createTeamFeed(team.id);
	await addData(FirestoreCollections.TEAMS, team.id, team);
	return team;
};

export const getTeamById = async (id: TeamID): Promise<Team> => {
	const team = await readData<Team>(FirestoreCollections.TEAMS, id);
	if (!team) {
		throw NO_SUCH_TEAM_EXISTS;
	}
	return team;
};

export const updateTeamData = async (id: TeamID, team: Team) =>
	await addData<Team>(FirestoreCollections.TEAMS, id, team);

export const joinTeam = async (userID: UserID, teamID: TeamID) => {
	const team = await getTeamById(teamID);
	await userJoinTeam(teamID, userID);
	return await updateTeamData(teamID, {
		...team,
		members: [...team.members, userID],
	});
};

export const getTeamFeed = async (teamId: TeamID) =>
	await readData<TeamFeed>(FirestoreCollections.TEAM_FEED, teamId);

export const updateTeamFeed = async (teamID: TeamID, feed: TeamFeed) =>
	await addData<TeamFeed>(FirestoreCollections.TEAM_FEED, teamID, feed);

export const createTeamFeed = async (teamID: TeamID) =>
	await updateTeamFeed(teamID, { id: teamID, messages: [] });

export const addFeedItem = async (
	teamID: TeamID,
	message: MeetingMessage | Message,
	type: FeedType
) => {
	const feed = await getTeamFeed(teamID);
	if (!feed) throw NO_SUCH_TEAM_EXISTS;

	const feedItem: FeedItem<MeetingMessage | Message> = {
		type,
		content: message,
		dateCreated: Date.now(),
	};
	return await updateTeamFeed(teamID, {
		...feed,
		messages: [...feed.messages, feedItem],
	});
};
