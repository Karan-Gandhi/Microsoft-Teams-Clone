import { fetchUsingGET, fetchUsingPOST } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { CreateMeetingRequest } from "../api/Requests";
import { CreateMeetingResponse, GetMeetingByIdResponse } from "../api/Responses";
import Meeting, { MeetingID } from "../types/Meeting";
import { SocketMessageID } from "../types/SocketServer/SocketMessage";
import { TeamID } from "../types/Team";
import { sendMessage } from "./WebSocketUtils";

export const createMeeting = async (name: string, time: number, teamID: TeamID) =>
  await fetchUsingPOST<CreateMeetingRequest, CreateMeetingResponse>(APIRoutes.CREATE_MEETING, { name, time, teamID });

export const getMeetingById = async (meetingID: string) =>
  (await fetchUsingGET<GetMeetingByIdResponse>(APIRoutes.GET_MEETING_BY_ID, [meetingID])).data;

export const joinMeeting = (meeting: Meeting) => {
  sendMessage<Meeting>(SocketMessageID.JOIN_MEETING, meeting);
};

export const leaveMeeting = async (meetingID: MeetingID) => {
  sendMessage<Meeting>(SocketMessageID.LEAVE_MEETING, await getMeetingById(meetingID));
};
