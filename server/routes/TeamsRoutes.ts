import * as express from "express";
import { FeedType } from "../types/FeedItem";
import Message from "../types/Message";
import User from "../types/User";
import {
  addFeedItem,
  addUserToTeam,
  createTeam,
  getTeamAdmin,
  getTeamById,
  getTeamFeed,
  getTeamMembers,
  joinTeam,
  removeUser,
  userBelongsToTeam,
} from "../utils/TeamsUtils";

const router = express.Router();

router.use(async (req, res, next) => {
  const user = JSON.parse(req.user as string) as User;
  if (!!req.params.id) {
    const teamID = req.params.id;
    if (await userBelongsToTeam(teamID, user.id)) {
      next();
    } else {
      res.sendStatus(403);
    }
  } else {
    next();
  }
});

router.get("/", async (req, res) => {
  const user = JSON.parse(req.user as string) as User;
  // returns all the teams that the user belongs to
  res.json({ teams: user.teams });
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

router.post("/sendMessage/:id", async (req, res) => {
  try {
    const { content } = req.body;
    const user = JSON.parse(req.user as string) as User;
    const message: Message = { content, sender: user.id, name: user.name };
    await addFeedItem(req.params.id, message, FeedType.Message);
    res.sendStatus(204);
  } catch {
    res.sendStatus(404);
  }
});

router.get("/teamMembers/:id", async (req, res) => {
  try {
    const { id } = req.params;
    res.json({ members: await getTeamMembers(id) });
  } catch {
    res.sendStatus(404);
  }
});

router.put("/addUser/:id", async (req, res) => {
  try {
    const user = JSON.parse(req.user as string) as User;
    if (user.id !== (await getTeamAdmin(req.params.id))) return res.sendStatus(403);
    await addUserToTeam(req.params.id, req.body.userID);
    res.sendStatus(204);
  } catch {
    res.sendStatus(404);
  }
});

router.delete("/removeUser/:id", async (req, res) => {
  try {
    const user = JSON.parse(req.user as string) as User;
    if (user.id !== (await getTeamAdmin(req.params.id))) return res.sendStatus(403);
    await removeUser(req.params.id, req.body.userID);
    res.sendStatus(204);
  } catch {
    res.sendStatus(404);
  }
});

export default router;
