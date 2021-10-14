import * as express from "express";
import User from "../types/User";
import { getUserByID, searchUserByEmail } from "../utils/UserUtils";

const router = express.Router();

const SEARCH_USER_SIZE = 5;

router.get("/:id", async (req, res) => {
	try {
		const user = await getUserByID(req.params.id);
		res.json({ id: user.id, name: user.name, email: user.email });
	} catch {
		res.sendStatus(404);
	}
});

router.get("/searchUserByID/:email", async (req, res) => {
	// returns the best 5 answers
	const { email } = req.params;
	const user = JSON.parse(req.user as string) as User;

	res.json({ results: await searchUserByEmail(email, SEARCH_USER_SIZE, user.email) });
});

export default router;
