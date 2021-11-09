import { Server } from "http";
import { Socket } from "net";
import WebSocket from "ws";
import User from "../types/User";
import SocketMessage, { createSocketMessage, SocketMessageID } from "../types/SocketServer/SocketMessage";
import { SocketRoomID } from "../types/SocketServer/SocketRoom";
import { verifyAccessToken } from "../utils/AuthUtils";

const rooms = new Map<SocketRoomID, WebSocket[]>();

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

export const addEvent = <T>(mid: SocketMessageID, socket: WebSocket, callback: (data: T, user: User) => any) => {
  socket.on("message", (data) => {
    try {
      const message = createSocketMessage<T>(data);
      if (!message.Authorization) return socket.close();
      verifyAccessToken(message.Authorization, (error, user) => {
        if (error) return socket.close();
        delete user?.iat;
        delete user?.exp;
        if (message.id === mid) callback(message.body, user as User);
      });
    } catch {
      socket.close(); // the socket will close if it recieves badly formated text and prevent the server from crashing
    }
  });
};

export const createRoomIfNotExists = (roomID: SocketRoomID) => {
  if (!rooms.has(roomID)) rooms.set(roomID, []);
};

export const joinRoom = (id: SocketRoomID, socket: WebSocket) => {
  const room = rooms.get(id);
  if (room) room.push(socket);
};

export const deleteRoom = (id: SocketRoomID) => {
  rooms.delete(id);
};

export const emitInRoom = <T>(id: SocketRoomID, mid: SocketMessageID, data: T) => {
  const room = rooms.get(id);
  const socketMessage: SocketMessage<T> = { id: mid, body: data };
  if (room) room.forEach((socket) => socket.send(JSON.stringify(socketMessage)));
};

export const removeSocketFromRoom = (id: SocketRoomID, socket: WebSocket) => {
  const room = rooms.get(id);
  if (room) room.splice(room.indexOf(socket), 1);
};

export const getSocketRoom = (socket: WebSocket) => {
  let res = null;
  rooms.forEach((room, id) => {
    if (room.includes(socket)) res = id;
  });

  return res;
};

export const sendMessageToSocket = <T>(socket: WebSocket, mid: SocketMessageID, data: T) => {
  const socketMessage: SocketMessage<T> = { id: mid, body: data };
  socket.send(JSON.stringify(socketMessage));
};

export default createWebSocketServer;

// (() => {
//   (function report() {
//     const usage = process.memoryUsage();
//     const newUsage: { [key: string]: string } = {};
//     // usage.
//     for (let key of Object.keys(usage)) {
//       newUsage[key] = Math.round((usage[key as "arrayBuffers" | "external" | "heapTotal" | "heapUsed" | "rss"] || 0) / 1024 / 1024) + "MB";
//     }

//     console.log(new Date());
//     console.log("  MEM:", newUsage);
//     console.log("");

//     setTimeout(report, 5000);
//   })();
// })();
