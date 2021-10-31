import * as WebSocket from "ws";
import { addEvent, createRoomIfNotExists, emitInRoom, getSocketRoom, joinRoom, removeSocketFromRoom } from "../services/WebSocket";
import Meeting, { MeetingParticipantsMessage } from "../types/Meeting";
import { SocketMessageID } from "../types/SocketServer/SocketMessage";
import { joinMeeting, leaveMeeting, startMeetingIfNotStarted } from "./MeetingUtils";

const addWebServerEvents = (server: WebSocket.Server) => {
  server.on("connection", (socket) => {
    addEvent<Meeting>(SocketMessageID.JOIN_MEETING, socket, async (data, user) => {
      createRoomIfNotExists(data.meetingID);
      joinRoom(data.meetingID, socket);
      emitInRoom(data.meetingID, SocketMessageID.USER_JOINED_MEETING, { user });
      await startMeetingIfNotStarted(data.meetingID);
      joinMeeting(data.meetingID, user.id);
    });

    addEvent<MeetingParticipantsMessage>(SocketMessageID.SEND_MESSAGE_TO_MEETING, socket, (data) => {
      emitInRoom(data.meetingID, SocketMessageID.SEND_MESSAGE_TO_MEETING, { message: data });
    });

    addEvent<Meeting>(SocketMessageID.LEAVE_MEETING, socket, async (data, user) => {
      emitInRoom(data.meetingID, SocketMessageID.USER_LEFT_MEETING, { user });
      removeSocketFromRoom(data.meetingID, socket);
      leaveMeeting(data.meetingID, user.id);
    });

    socket.on("disconnect", () => {
      const roomID = getSocketRoom(socket);
      if (roomID) {
        removeSocketFromRoom(roomID, socket);
      }
    });
  });
};

export default addWebServerEvents;
