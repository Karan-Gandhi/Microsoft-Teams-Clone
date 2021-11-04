import { fetchUsingGET, fetchUsingPOST } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { CreateMeetingRequest } from "../api/Requests";
import { CreateMeetingResponse, GetMeetingByIdResponse, GetMeetingParticipantsResponse } from "../api/Responses";
import Meeting, { MeetingID, MeetingParticipantsMessage } from "../types/Meeting";
import SocketMessage, { SocketMessageID } from "../types/SocketServer/SocketMessage";
import { TeamID } from "../types/Team";
import User, { UserID } from "../types/User";
import { getUserID, getUserName } from "./UserUtils";
import { addEvent, removeEvent, sendMessage } from "./WebSocketUtils";

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

export const getMeetingParticipants = async (meetingID: MeetingID) =>
  (await fetchUsingGET<GetMeetingParticipantsResponse>(APIRoutes.GET_MEETING_PARTICIPANTS, [meetingID])).data;

export const subscribeToMeetingParticipantsChanges = (callback: (data: SocketMessage<User>) => any) => {
  let key1 = addEvent<User>(SocketMessageID.USER_JOINED_MEETING, callback);
  let key2 = addEvent<User>(SocketMessageID.USER_LEFT_MEETING, callback);

  return [key1, key2];
};

export const unsubscribeToMeetingParticipantsChanges = (keys: string[]) => {
  removeEvent(keys[0]);
  removeEvent(keys[1]);
};

export const sendMessageInMeeting = (message: string, meetingID: MeetingID) => {
  const messageToSend: MeetingParticipantsMessage = {
    meetingID,
    message,
    userID: getUserID() as UserID,
    userName: getUserName() as string,
  };

  sendMessage<MeetingParticipantsMessage>(SocketMessageID.SEND_MESSAGE_TO_MEETING, messageToSend);
};

export const subscribeToMeetingMessages = (callback: (data: SocketMessage<MeetingParticipantsMessage>) => any) => {
  return addEvent<MeetingParticipantsMessage>(SocketMessageID.SEND_MESSAGE_TO_MEETING, callback);
};

export const unsubscribeToMeetingMessages = (key: string) => {
  removeEvent(key);
};
