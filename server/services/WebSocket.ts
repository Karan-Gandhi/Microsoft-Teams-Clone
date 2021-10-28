import { Server } from "http";
import { Socket } from "net";
import WebSocket from "ws";

import User from "../types/User";
import { createSocketMessage, SocketMessageID } from "../types/SocketServer/SocketMessage";
import { RoomID } from "../types/SocketServer/SocketRoom";
import { verifyAccessToken } from "../utils/AuthUtils";

const createWebSocketServer = (expressServer: Server, path?: string) => {
  const websocketServer = new WebSocket.Server({ noServer: true, path });

  expressServer.on("upgrade", (req, socket, head) => {
    websocketServer.handleUpgrade(req, socket as Socket, head, (webSocket) => {
      websocketServer.emit("connection", webSocket, req);
    });
    websocketServer.on("error", (error) => console.log(error));
  });

  return websocketServer;
};

export const addEvent = <T>(socket: WebSocket, mid: SocketMessageID, callback: (data: T, user: User) => any) => {
  socket.on("message", (data) => {
    try {
      const message = createSocketMessage<T>(data);
      verifyAccessToken(message.Authorization, (error, user) => {
        if (error) return socket.close();
        delete user?.iat;
        delete user?.exp;
        if (message.id === mid) callback(message.body, user as User);
      });
    } catch {
      socket.close(); // the socket will cloas if it recieves badly formated text and prevent the server from crashing
    }
  });
};

export const createRoom = (id: RoomID) => {};

export const joinRoom = (id: RoomID, socket: WebSocket) => {};

export default createWebSocketServer;
