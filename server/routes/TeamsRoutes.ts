import * as express from "express";
import User from "../types/User";
import {
	createTeam,
	getTeamById,
	getUserTeams,
	joinTeam,
} from "../utils/TeamsUtils";

const router = express.Router();

router.get("/", (req, res) => {
	const user = JSON.parse(req.user as string) as User;
	// returns all the teams that the user belongs to
	res.json({ teams: getUserTeams(user.id) });
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
	const team = await getTeamById(req.params.id);
	res.json(team);
});

router.get("/feed/:id", async (req, res) => {});

router.post("/message/:teamID", (req, res) => {});

export default router;
