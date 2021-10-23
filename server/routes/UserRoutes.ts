import * as express from "express";
import User from "../types/User";
import { removeUser } from "../utils/TeamsUtils";
import { getUserByID, searchUserByEmail } from "../utils/UserUtils";

const router = express.Router();

const SEARCH_USER_SIZE = 5;

router.get("/searchUserByID/:email", async (req, res) => {
  // returns the best 5 answers
  const { email } = req.params;
  const user = JSON.parse(req.user as string) as User;

  res.json({
    results: await searchUserByEmail(email, SEARCH_USER_SIZE, user.email),
  });
});

router.get("/userInfo", (req, res) => {
  const user = JSON.parse(req.user as string) as User;
  delete user.password;
  delete user.teams;
  res.json({ ...user });
});

router.get("/:id", async (req, res) => {
  try {
    const user = await getUserByID(req.params.id);
    res.json({ id: user.id, name: user.name, email: user.email });
  } catch {
    res.sendStatus(404);
  }
});

router.delete("/leaveTeam/:id", async (req, res) => {
  try {
    const user = JSON.parse(req.user as string) as User;
    await removeUser(req.params.id, user.id);
    res.sendStatus(204);
  } catch {
    res.sendStatus(404);
  }
});

export default router;
