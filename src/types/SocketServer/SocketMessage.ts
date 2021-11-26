import { AccessToken } from "../Tokens";

export enum SocketMessageID {
  JOIN_MEETING,
  LEAVE_MEETING,
  SEND_MESSAGE_TO_MEETING,
  USER_JOINED_MEETING,
  USER_LEFT_MEETING,
  SEND_AUDIO,
  SEND_VIDEO,
  EMIT_VIDEO,
  EMIT_AUDIO,
  GET_PARTICIPANTS,
  VIDEO_ON,
  VIDEO_OFF,
  AUDIO_ON,
  AUDIO_OFF,
}

export default interface SocketMessage<T> {
  id: SocketMessageID;
  Authorization?: AccessToken;
  body: T;
}

export const createSocketMessage = <T>(data: string): SocketMessage<T> => JSON.parse(data.toString());
