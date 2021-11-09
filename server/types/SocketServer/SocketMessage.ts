import WebSocket from "ws";
import { Token } from "../Tokens";

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
}

export default interface SocketMessage<T> {
  id: SocketMessageID;
  Authorization?: Token;
  body: T;
}

export const createSocketMessage = <T>(data: WebSocket.RawData): SocketMessage<T> => JSON.parse(data.toString());
