export declare type MeetingID = string;
export interface MeetingMessage {
    meetingID: string;
    joined: number;
    start: Date;
}