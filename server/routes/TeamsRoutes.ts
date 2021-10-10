import * as express from "express";
import { FeedType } from "../types/FeedItem";
import Message from "../types/Message";
import User from "../types/User";
import {
	addFeedItem,
	createTeam,
	getTeamById,
	getTeamFeed,
	joinTeam,
} from "../utils/TeamsUtils";
import { getUserTeams } from "../utils/UserUtils";

const router = express.Router();

router.get("/", async (req, res) => {
	const user = JSON.parse(req.user as string) as User;
	// returns all the teams that the user belongs to
	res.json({ teams: await getUserTeams(user.id) });
});

router.post("/createTeam", async (req, res) => {
	// creates a team with some information
	const { name, members } = req.body;
	const user = JSON.parse(req.user as string) as User; // this user will be the admin
	res.json(await createTeam(name, user.id, members));
});

router.post("/joinTeam", async (req, res) => {
	const { teamID } = req.body;
	const user = JSON.parse(req.user as string) as User;
	try {
		await joinTeam(user.id, teamID);
	} catch {
		res.sendStatus(404);
	}
	res.sendStatus(204);
});

router.get("/:id", async (req, res) => {
	try {
		const team = await getTeamById(req.params.id);
		res.json(team);
	} catch {
		return res.sendStatus(404);
	}
});

router.get("/feed/:id", async (req, res) => {
	try {
		const feed = await getTeamFeed(req.params.id);
		res.json(feed);
	} catch {
		res.sendStatus(404);
	}
});

router.post("/sendMessage/:teamID", async (req, res) => {
	try {
		const { content } = req.body;
		const user = JSON.parse(req.user as string) as User;
		const message: Message = { content, sender: user.id };
		await addFeedItem(req.params.teamID, message, FeedType.Message);
		res.sendStatus(204);
	} catch {
		res.sendStatus(404);
	}
});

export default router;