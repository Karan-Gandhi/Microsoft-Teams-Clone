import express from "express";
import authRouter from "./routes/auth";

const PORT = 5000;
const app = express();

app.get("/", (_, res) => {
	res.send("Hello, world ");
});

app.use("/auth", authRouter);

app.listen(PORT, () => console.log("Server started at port: " + PORT));
