import { fetchUsingGET, fetchUsingPOST } from "../api/APIControler";
import APIRoutes from "../api/APIRoutes";
import { CreateMeetingRequest } from "../api/Requests";
import { CreateMeetingResponse, GetMeetingByIdResponse } from "../api/Responses";
import { TeamID } from "../types/Team";

export const createMeeting = async (name: string, time: number, teamID: TeamID) =>
  await fetchUsingPOST<CreateMeetingRequest, CreateMeetingResponse>(APIRoutes.CREATE_MEETING, { name, time, teamID });

export const getMeetingById = async (meetingID: string) =>
  (await fetchUsingGET<GetMeetingByIdResponse>(APIRoutes.GET_MEETING_BY_ID, [meetingID])).data;
