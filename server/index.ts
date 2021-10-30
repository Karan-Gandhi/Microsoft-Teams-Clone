import express from "express";
import { config } from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/AuthRoutes";
import APIRouter from "./routes/APIRoutes";
import createWebSocketServer, { addEvent, createRoomIfNotExists, emitInRoom, joinRoom } from "./services/WebSocket";
import { SocketMessageID } from "./types/SocketServer/SocketMessage";
import Meeting from "./types/Meeting";

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

config();

app.get("/", (_, res) => {
  res.send("Hello, world");
});

app.use("/auth", AuthRouter);
app.use("/api", APIRouter);

const server = app.listen(PORT, () => console.log("[S] Server started at port: " + PORT));
const websocketServer = createWebSocketServer(server);

websocketServer.on("connection", (socket) => {
  addEvent<Meeting>(SocketMessageID.JOIN_MEETING, socket, (data, user) => {
    createRoomIfNotExists(data.meetingID);
    joinRoom(data.meetingID, socket);
    emitInRoom(data.meetingID, SocketMessageID.USER_JOINED_MEETING, { user });
  });
  addEvent(SocketMessageID.SEND_MESSAGE_TO_MEETING, socket, (data) => {});
});
