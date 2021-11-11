import express from "express";
import { config } from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/AuthRoutes";
import APIRouter from "./routes/APIRoutes";
import createWebSocketServer from "./services/WebSocket";
import addWebServerEvents from "./utils/WebSocketUtils";

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
addWebServerEvents(websocketServer);
