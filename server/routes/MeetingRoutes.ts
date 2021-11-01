import * as express from "express";
import User from "../types/User";
import { createMeeting, getMeetingByID } from "../utils/MeetingUtils";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, time, teamID } = req.body;
  const user = JSON.parse(req.user as string) as User;
  const meeting = await createMeeting(name, time, user.id, teamID);
  res.json(meeting);
});

router.get("/:meetingID", async (req, res) => {
  const { meetingID } = req.params;
  try {
    const meeting = await getMeetingByID(meetingID);
    res.json(meeting);
  } catch {
    res.sendStatus(404);
  }
});

export default router;
