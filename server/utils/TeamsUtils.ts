import { v4 } from "uuid";
import { addData, readData } from "../services/Firestore";
import { FeedType } from "../types/FeedItem";
import FirestoreCollections from "../types/FirestoreCollections";
import JoinMessage from "../types/JoinMessage";
import LeaveMessage from "../types/LeaveMessage";
import { MeetingMessage } from "../types/Meeting";
import Message from "../types/Message";
import Team, { TeamFeed, TeamFeedMessage, TeamID } from "../types/Team";
import { UserID } from "../types/User";
import { getUserByID, removeUserFromTeam, userJoinTeam } from "./UserUtils";

const NO_SUCH_TEAM_EXISTS = new Error("No such team exists");

export const createTeam = async (name: string, admin: UserID, members: UserID[]): Promise<Team> => {
  const team: Team = {
    id: v4(),
    name,
    admin,
    members: [...members, admin],
  };

  members.forEach(async (member) => await userJoinTeam(team.id, member));

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

export const updateTeamData = async (id: TeamID, team: Team) => await addData<Team>(FirestoreCollections.TEAMS, id, team);

export const joinTeam = async (userID: UserID, teamID: TeamID) => {
  const team = await getTeamById(teamID);
  await userJoinTeam(teamID, userID);
  return await updateTeamData(teamID, {
    ...team,
    members: [...team.members, userID],
  });
};

export const getTeamFeed = async (teamId: TeamID) => await readData<TeamFeed>(FirestoreCollections.TEAM_FEED, teamId);

export const updateTeamFeed = async (teamID: TeamID, feed: TeamFeed) =>
  await addData<TeamFeed>(FirestoreCollections.TEAM_FEED, teamID, feed);

export const createTeamFeed = async (teamID: TeamID) => await updateTeamFeed(teamID, { id: teamID, messages: [] });

export const addFeedItem = async (teamID: TeamID, message: MeetingMessage | Message | JoinMessage | LeaveMessage, type: FeedType) => {
  const feed = await getTeamFeed(teamID);
  if (!feed) throw NO_SUCH_TEAM_EXISTS;

  const feedItem: TeamFeedMessage = {
    type,
    content: message,
    dateCreated: Date.now(),
  };
  return await updateTeamFeed(teamID, {
    ...feed,
    messages: [...feed.messages, feedItem],
  });
};

export const getTeamMembers = async (teamID: TeamID) => {
  const team = await getTeamById(teamID);
  return team.members;
};

export const addUserToTeam = async (teamID: TeamID, userID: UserID) => {
  const team: Team = await getTeamById(teamID);
  if (team.members.findIndex((user) => user === userID) !== -1) return;
  team.members.push(userID);

  await updateTeamData(teamID, team);
  await userJoinTeam(teamID, userID);
};

export const getTeamAdmin = async (teamID: TeamID) => (await getTeamById(teamID)).admin;

export const removeUser = async (teamID: TeamID, userID: UserID) => {
  const team = await getTeamById(teamID);
  if (team.members.findIndex((user) => user === userID) === -1) return;
  team.members.splice(
    team.members.findIndex((member) => member === userID),
    1
  );

  await addFeedItem(teamID, { userLeave: (await getUserByID(userID)).name }, FeedType.UserLeave);
  await updateTeamData(teamID, team);
  await removeUserFromTeam(userID, teamID);
};

export const userBelongsToTeam = async (teamID: TeamID, userID: UserID) => {
  const team = await getTeamById(teamID);
  if (team.members.findIndex((memberID) => memberID === userID) === -1) return false;
  else return true;
};

export const addMeeting = async (teamID: TeamID, meetingID: string) => {
  const team = await getTeamById(teamID);
  if (team.meetings) {
    team.meetings.push(meetingID);
  } else {
    team.meetings = [meetingID];
  }
  await updateTeamData(teamID, team);
};

export const getTeamMeetings = async (teamID: TeamID) => {
  const team = await getTeamById(teamID);
  return team.meetings;
};
