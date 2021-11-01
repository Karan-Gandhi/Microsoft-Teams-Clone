import * as express from "express";
import User from "../types/User";
import { createMeeting } from "../utils/MeetingUtils";
import { getTeamMeetings } from "../utils/TeamsUtils";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, time, teamID } = req.body;
  const user = JSON.parse(req.user as string) as User;
  const meeting = await createMeeting(name, time, user.id, teamID);
  res.json(meeting);
});

router.get("/:teamID", async (req, res) => {
  const { teamID } = req.params;
  const meetings = await getTeamMeetings(teamID);
  res.json({ meetings });
});

export default router;
