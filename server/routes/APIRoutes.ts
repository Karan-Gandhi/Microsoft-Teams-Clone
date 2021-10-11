import * as jwt from "jsonwebtoken";
import express from "express";
import TeamsRouter from "./TeamsRoutes";
import UserRouter from "./UserRoutes";

const router = express.Router();

router.use((req, res, next) => {
	if (!req.headers.authorization) return res.sendStatus(401);
	const [type, token] = req.headers.authorization.split(" ");
	if (!token) return res.sendStatus(401);

	jwt.verify(
		token,
		process.env.ACCESS_TOKEN_SECRET as string,
		(error, user) => {
			if (error) return res.sendStatus(403);
			// req.user = user as User;
			req.user = JSON.stringify(user);
			next();
		}
	);
});

router.get("/", (_, res) => {
	res.send("Hello world from api");
});

router.use("/teams", TeamsRouter);
router.use("/users", UserRouter);

export default router;
