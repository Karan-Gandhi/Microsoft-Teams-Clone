import { v4 as uuidv4 } from "uuid";
import { addData, readData } from "../services/Firestore";
import { deleteRoom } from "../services/WebSocket";
import FirestoreCollections from "../types/FirestoreCollections";
import Meeting, { MeetingID } from "../types/Meeting";
import { TeamID } from "../types/Team";
import { UserID } from "../types/User";
import { addMeeting } from "./TeamsUtils";

const onGoingMeetings = new Map<MeetingID, Meeting>();

export const meetingIsStarted = (meetingID: MeetingID): boolean => {
  return onGoingMeetings.has(meetingID);
};

export const startMeeting = async (meetingID: MeetingID) => {
  onGoingMeetings.set(meetingID, await getMeetingByID(meetingID));
};

export const joinMeeting = (meetingID: MeetingID, userID: UserID) => {
  const meeting = onGoingMeetings.get(meetingID);
  if (meeting) {
    meeting.participants = meeting.participants || [];
    if (meeting.participants.includes(userID)) {
      throw new Error("User already in meeting");
    }
    meeting.participants.push(userID);
  } else {
    throw new Error("Meeting not started");
  }
};

export const getMeetingByID = async (meetingID: MeetingID): Promise<Meeting> => {
  return await readData<Meeting>(FirestoreCollections.MEETINGS, meetingID);
};

export const updateMeeting = async (meeting: Meeting) => {
  return await addData(FirestoreCollections.MEETINGS, meeting.meetingID, meeting);
};

export const createMeeting = async (name: string, time: number, teamID: TeamID) => {
  const meeting: Meeting = {
    teamID,
    meetingID: generateMeetingID(),
    meetingName: name,
    meetingTime: time,
  };
  await addData(FirestoreCollections.MEETINGS, meeting.meetingID, meeting);
  await addMeeting(teamID, meeting.meetingID);
  return meeting;
};

export const generateMeetingID = (): MeetingID => {
  return uuidv4();
};

export const startMeetingIfNotStarted = async (meetingID: MeetingID) => {
  if (!meetingIsStarted(meetingID)) {
    await startMeeting(meetingID);
  }
};

export const leaveMeeting = (meetingID: MeetingID, userID: UserID) => {
  const meeting = onGoingMeetings.get(meetingID);
  if (meeting) {
    meeting.participants = meeting.participants || [];
    const index = meeting.participants.indexOf(userID);
    if (index > -1) {
      meeting.participants.splice(index, 1);

      if (meeting.participants.length === 0) {
        onGoingMeetings.delete(meetingID);
        deleteRoom(meetingID);
      }
    }
  } else {
    throw new Error("Meeting not started");
  }
};
