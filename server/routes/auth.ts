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
	} catch (error) {
		res.send(error);
	}
});

// This will return the logged in user including the access token
router.post("/createUserWithEmailAndPassword", async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const accessToken: AccessToken = await createUserWithEmailAndPassword(name, email, password);
		res.json(accessToken);
	} catch (error) {
		res.send(error);
	}
});

export default router;
