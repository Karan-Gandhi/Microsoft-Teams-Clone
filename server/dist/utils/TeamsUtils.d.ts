import { FeedType } from "../types/FeedItem";
import { MeetingMessage } from "../types/Meeting";
import Message from "../types/Message";
import Team, { TeamFeed, TeamID } from "../types/Team";
import { UserID } from "../types/User";
export declare const createTeam: (name: string, admin: UserID, members: UserID[]) => Promise<Team>;
export declare const getTeamById: (id: TeamID) => Promise<Team>;
export declare const updateTeamData: (id: TeamID, team: Team) => Promise<FirebaseFirestore.WriteResult>;
export declare const joinTeam: (userID: UserID, teamID: TeamID) => Promise<FirebaseFirestore.WriteResult>;
export declare const getTeamFeed: (teamId: TeamID) => Promise<TeamFeed>;
export declare const updateTeamFeed: (teamID: TeamID, feed: TeamFeed) => Promise<FirebaseFirestore.WriteResult>;
export declare const createTeamFeed: (teamID: TeamID) => Promise<FirebaseFirestore.WriteResult>;
export declare const addFeedItem: (teamID: TeamID, message: MeetingMessage | Message, type: FeedType) => Promise<FirebaseFirestore.WriteResult>;
//# sourceMappingURL=TeamsUtils.d.ts.map