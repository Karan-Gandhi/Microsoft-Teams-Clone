import express from "express";
import AccessToken from "../types/AccessToken";
import { createUserWithEmailAndPassword, loginWithEmailAndPassword } from "../utils/AuthUtils";

const router = express.Router();

router.get("/", (_, res) => {
	res.send("Hello world from auth");
});

router.post("/loginWithEmailAndPassword", async (req, res) => {
	const { email, password } = req.body;

	try {
		const accessToken: AccessToken = await loginWithEmailAndPassword(email, password);
		res.json(accessToken);
	} catch (error: any) {
		res.status(403);
		res.send({ message: error.message });
	}
});

// This will return the logged in user including the access token
router.post("/createUserWithEmailAndPassword", async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const accessToken: AccessToken = await createUserWithEmailAndPassword(name, email, password);
		res.json(accessToken);
	} catch (error: any) {
		res.status(403);
		res.send({ message: error.message });
	}
});

export default router;
