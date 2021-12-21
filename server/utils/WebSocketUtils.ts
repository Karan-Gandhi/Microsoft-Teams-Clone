import * as WebSocket from "ws";
import {
  addEvent,
  createRoomIfNotExists,
  emitInRoom,
  emitInRoomExcept,
  getSocketRoom,
  joinRoom,
  removeSocketFromRoom,
} from "../services/WebSocket";
import Meeting, { MeetingParticipantsMessage } from "../types/Meeting";
import { SocketMessageID } from "../types/SocketServer/SocketMessage";
import { joinMeeting, leaveMeeting, startMeetingIfNotStarted } from "./MeetingUtils";

const addWebServerEvents = (server: WebSocket.Server) => {
  server.on("connection", (socket) => {
    addEvent<Meeting>(SocketMessageID.JOIN_MEETING, socket, async (data, user) => {
      try {
        createRoomIfNotExists(data.meetingID);
        joinRoom(data.meetingID, socket);
        delete user.password;
        delete user.teams;
        await startMeetingIfNotStarted(data.meetingID);
        joinMeeting(data.meetingID, user.id);
        emitInRoom(data.meetingID, SocketMessageID.USER_JOINED_MEETING, { ...user });
      } catch (err) {
        console.log(err);
      }
    });

    addEvent<MeetingParticipantsMessage>(SocketMessageID.SEND_MESSAGE_TO_MEETING, socket, (data) => {
      emitInRoom(data.meetingID, SocketMessageID.SEND_MESSAGE_TO_MEETING, { ...data });
    });

    addEvent<Meeting>(SocketMessageID.LEAVE_MEETING, socket, async (data, user) => {
      delete user.password;
      delete user.teams;
      removeSocketFromRoom(data.meetingID, socket);
      leaveMeeting(data.meetingID, user.id);
      emitInRoom(data.meetingID, SocketMessageID.USER_LEFT_MEETING, { ...user });
    });

    addEvent<string>(SocketMessageID.SEND_VIDEO, socket, async (data, user) => {
      emitInRoomExcept(getSocketRoom(socket), SocketMessageID.EMIT_VIDEO, { video: data, name: user.name, id: user.id }, socket);
    });

    addEvent<string>(SocketMessageID.VIDEO_ON, socket, async (data, user) => {
      emitInRoomExcept(getSocketRoom(socket), SocketMessageID.VIDEO_ON, { video: data, name: user.name, id: user.id }, socket);
    });

    addEvent<string>(SocketMessageID.VIDEO_OFF, socket, async (data, user) => {
      emitInRoomExcept(getSocketRoom(socket), SocketMessageID.VIDEO_OFF, { video: data, name: user.name, id: user.id }, socket);
    });

    socket.on("disconnect", () => {
      const roomID = getSocketRoom(socket);
      socket.removeAllListeners();
      if (roomID.length !== 0) {
        removeSocketFromRoom(roomID, socket);
      }
    });
  });
};

export default addWebServerEvents;
