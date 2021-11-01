import { getAccessToken } from "../api/Auth";
import SocketMessage, { SocketMessageID } from "../types/SocketServer/SocketMessage";

export const getWebSocketUrl = (): string => {
  return "ws://localhost:5000";
};

const webSocket = new WebSocket(getWebSocketUrl());

export const sendMessage = <T>(mid: SocketMessageID, data: T) => {
  const message: SocketMessage<T> = { id: mid, Authorization: getAccessToken(), body: data };
  webSocket.send(JSON.stringify(message));
};

export const addEvent = <T>(mid: SocketMessageID, callback: (message: SocketMessage<T>) => any) => {
  webSocket.addEventListener("message", (ev) => {
    const message: SocketMessage<T> = JSON.parse(ev.data);
    if (message.id === mid) {
      callback(message);
    }
  });
};
