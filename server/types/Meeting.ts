import { TeamID } from "./Team";
import { UserID } from "./User";

export type MeetingID = string;

export default interface Meeting {
  teamID: TeamID;
  meetingID: MeetingID;
  meetingName: string;
  meetingTime: number;
  participants?: UserID[];
}

export interface MeetingMessage {
  meetingID: string;
  start: number;
}
