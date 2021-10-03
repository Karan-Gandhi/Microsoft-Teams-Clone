import * as jwt from "jsonwebtoken";
import express from "express";

const router = express.Router();

router.use((req, res, next) => {
	if (!req.headers.authorization) return res.sendStatus(401);
	const [type, token] = req.headers.authorization.split(" ");
	if (!token) return res.sendStatus(401);

	console.log(type);

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "", (err, user) => {
		if (err) return res.sendStatus(403);
		console.log(user);
		next();
	});
});

router.get("/", (_, res) => {
	res.send("Hello world from api");
});

export default router;
