import FeedItem from "./FeedItem";
import Message from "./Message";
import { MeetingMessage } from "./Meeting";
import { UserID } from "./User";
export declare type TeamID = string;
export default interface Team {
    id: TeamID;
    name: string;
    members: UserID[];
    admin: UserID;
}
export interface TeamFeed {
    id: TeamID;
    messages: FeedItem<MeetingMessage | Message>[];
}
//# sourceMappingURL=Team.d.ts.map