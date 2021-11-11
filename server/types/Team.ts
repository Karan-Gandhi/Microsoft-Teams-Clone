import FeedItem from "./FeedItem";
import Message from "./Message";
import { MeetingID, MeetingMessage } from "./Meeting";
import { UserID } from "./User";
import JoinMessage from "./JoinMessage";
import LeaveMessage from "./LeaveMessage";

export type TeamID = string;

export default interface Team {
  id: TeamID;
  name: string;
  members: UserID[]; // this will also contain the admin
  admin: UserID;
  meetings?: MeetingID[];
}

export type TeamFeedMessage = FeedItem<MeetingMessage | Message | JoinMessage | LeaveMessage>;

export interface TeamFeed {
  id: TeamID;
  messages: TeamFeedMessage[];
}
