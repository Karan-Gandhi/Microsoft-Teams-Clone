import express from "express";
import { config } from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/AuthRoutes";
import APIRouter from "./routes/APIRoutes";

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

app.listen(PORT, () => console.log("Server started at port: " + PORT));
