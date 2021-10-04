import * as jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

router.use((req, res, next) => {
	if (!req.headers.authorization) return res.sendStatus(401);
	const [type, token] = req.headers.authorization.split(" ");
	if (!token) return res.sendStatus(401);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (error, user) => {
		console.log(error, token);
		if (error) return res.sendStatus(403);
		next();
	});
});

router.get("/", (_, res) => {
	res.send("Hello world from api");
});

export default router;
