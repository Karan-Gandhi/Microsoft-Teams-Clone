import WebSocket from "ws";
import { Token } from "../Tokens";

export enum SocketMessageID {
  JOIN_MEETING, // Join a meeting
  SEND_MESSAGE_TO_MEETING, // Send a message to a meeting
  USER_JOINED_MEETING, // User joined a meeting
}

export default interface SocketMessage<T> {
  id: SocketMessageID;
  Authorization?: Token;
  body: T;
}

export const createSocketMessage = <T>(data: WebSocket.RawData): SocketMessage<T> => JSON.parse(data.toString());
