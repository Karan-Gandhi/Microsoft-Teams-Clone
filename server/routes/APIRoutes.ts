import * as jwt from "jsonwebtoken";
import express from "express";
import TeamsRouter from "./TeamsRoutes";

const router = express.Router();

router.use((req, res, next) => {
	if (!req.headers.authorization) return res.sendStatus(401);
	const [type, token] = req.headers.authorization.split(" ");
	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
		if (error) return res.sendStatus(403);
		// req.user = user as User;
		req.user = JSON.stringify(user);
		next();
	});
});

router.get("/", (_, res) => {
	res.send("Hello world from api");
});

router.use("/teams", TeamsRouter);

export default router;
