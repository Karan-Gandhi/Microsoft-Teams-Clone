import WebSocket from "ws";
import { Token } from "../Tokens";

export enum SocketMessageID {
  JOIN,
}

export default interface SocketMessage<T> {
  id: SocketMessageID;
  Authorization: Token;
  body: T;
}

export const createSocketMessage = <T>(data: WebSocket.RawData): SocketMessage<T> => JSON.parse(data.toString());
