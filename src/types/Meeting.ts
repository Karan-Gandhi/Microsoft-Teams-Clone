import { TeamID } from "./Team";
import { UserID } from "./User";

export type MeetingID = string;

export default interface Meeting {
  teamID: TeamID;
  presenterID: UserID;
  meetingID: MeetingID;
  meetingName: string;
  meetingTime: number;
  participants?: UserID[];
}

export interface MeetingParticipantsMessage {
  meetingID: MeetingID;
  userName: string;
  userID: UserID;
  message: string;
}

export interface MeetingMessage {
  meetingID: MeetingID;
  name: string;
  start: number;
}
