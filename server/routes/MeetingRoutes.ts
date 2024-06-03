import * as express from "express";
import User from "../types/User";
import { createMeeting, getMeetingByID, getMeetingParticipants } from "../utils/MeetingUtils";
import { getUserByID } from "../utils/UserUtils";

const router = express.Router();

router.post("/create", async (req, res) => {
  const { name, time, teamID } = req.body;
  const user = JSON.parse(req.user as string) as User;
  const meeting = await createMeeting(name, time, user.id, teamID);
  res.json(meeting);
});

router.get("/participants/:meetingID", async (req, res) => {
  try {
    const { meetingID } = req.params;
    const participants = await Promise.all(
      getMeetingParticipants(meetingID).map(async (uid) => {
        const user = await getUserByID(uid);
        delete user.password;
        delete user.teams;
        return user;
      })
    );
    res.json({ participants });
  } catch {
    res.sendStatus(404);
  }
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
