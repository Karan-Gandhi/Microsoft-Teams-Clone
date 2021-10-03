import FeedItem from "./FeedItem";
import Message from "./Message";
import { MeetingMessage } from "./Meeting";
import { UserID } from "./User";
export declare type TeamID = string;
export default interface Team {
    name: string;
    members: UserID[];
    admin: UserID;
    start: Date;
    end: Date;
    attendees: number;
    feed: FeedItem<MeetingMessage | Message>[];
}
