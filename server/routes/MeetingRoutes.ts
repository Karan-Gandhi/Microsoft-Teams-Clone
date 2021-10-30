import * as express from "express";
import { createMeeting } from "../utils/MeetingUtils";
import { getTeamMeetings } from "../utils/TeamsUtils";

const router = express.Router();

router.post("/createMeeting", async (req, res) => {
  const { name, time, teamID } = req.body;
  const meeting = await createMeeting(name, time, teamID);
  res.json(meeting);
});

router.get("/:teamID", async (req, res) => {
  const { teamID } = req.params;
  const meetings = await getTeamMeetings(teamID);
  res.json({ meetings });
});

export default router;
