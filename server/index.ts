import express from "express";
import AuthRouter from "./routes/AuthRoutes";
import { config } from "dotenv";

const PORT = 5000;
const app = express();

app.use(express.json());
config();

app.get("/", (_, res) => {
	res.send("Hello, world ");
});

app.use("/auth", AuthRouter);

app.listen(PORT, () => console.log("Server started at port: " + PORT));
