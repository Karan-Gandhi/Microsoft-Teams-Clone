import FeedItem from "./FeedItem";
import Message from "./Message";
import { MeetingMessage } from "./Meeting";
import { UserID } from "./User";
import JoinMessage from "./JoinMessage";
import LeaveMessage from "./LeaveMessage";

export type TeamID = string;

export default interface Team {
	id: TeamID;
	name: string;
	members: UserID[]; // this will also contain the admin
	admin: UserID;
}

export interface TeamFeed {
	id: TeamID;
	messages: FeedItem<MeetingMessage | Message | JoinMessage | LeaveMessage>[];
}
