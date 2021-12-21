import { getAccessToken } from "../api/Auth";
import SocketMessage, { SocketMessageID } from "../types/SocketServer/SocketMessage";

interface Listener<T> {
  key: string;
  id: SocketMessageID;
  callback: (message: SocketMessage<T>) => any;
}

export const getWebSocketUrl = (): string => {
  return "ws://localhost:5000";
};

let webSocket = new WebSocket(getWebSocketUrl());
const listeners: Listener<any>[] = [];

webSocket.onmessage = (ev) => {
  try {
    const message: SocketMessage<any> = JSON.parse(ev.data);

    listeners.forEach((listener) => {
      if (listener.id === message.id) listener.callback(message);
    });
  } catch {
    webSocket.close();
  }
};

export const isOpen = () => webSocket.readyState === WebSocket.OPEN;

export const reconnect = () => {
  webSocket = new WebSocket(getWebSocketUrl());
  webSocket.onmessage = (ev) => {
    try {
      const message: SocketMessage<any> = JSON.parse(ev.data);

      listeners.forEach((listener) => {
        if (listener.id === message.id) listener.callback(message);
      });
    } catch {
      webSocket.close();
    }
  };
};

export const sendMessage = <T>(mid: SocketMessageID, data: T) => {
  if (!isOpen()) reconnect();
  const message: SocketMessage<T> = { id: mid, Authorization: getAccessToken(), body: data };
  webSocket.send(JSON.stringify(message));
};

export const addEvent = <T>(mid: SocketMessageID, callback: (message: SocketMessage<T>) => any) => {
  const key = `${mid}-${Math.random()}`;
  listeners.push({ id: mid, callback, key });
  return key;
};

export const removeEvent = (key: string) => {
  listeners.splice(
    listeners.findIndex((listener) => listener.key === key),
    1
  );
};
