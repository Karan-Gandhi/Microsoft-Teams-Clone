import { fetchUsingPOST } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { CreateMeetingRequest } from "../api/Requests";
import { CreateMeetingResponse } from "../api/Responses";
import { TeamID } from "../types/Team";

export const createMeeting = async (name: string, time: number, teamID: TeamID) =>
  await fetchUsingPOST<CreateMeetingRequest, CreateMeetingResponse>(APIRoutes.CREATE_MEETING, { name, time, teamID });
