import { useEffect, useState } from "react";
import { MeetingID } from "../types/Meeting";
import { SocketMessageID } from "../types/SocketServer/SocketMessage";
import User from "../types/User";
import {
  getMeetingParticipants,
  subscribeToMeetingParticipantsChanges,
  unsubscribeToMeetingParticipantsChanges,
} from "../utils/MeetingUtils";

const useParticipants = (meetingID: MeetingID, onUserJoin?: (user: User) => any, onUserLeave?: (user: User) => any) => {
  const [participants, setParticipants] = useState<User[]>([]);

  console.log(participants);

  useEffect(() => {
    getMeetingParticipants(meetingID).then((data) => {
      setParticipants(data.participants);
    });

    let keys = subscribeToMeetingParticipantsChanges((message) => {
      if (message.id === SocketMessageID.USER_JOINED_MEETING) {
        setParticipants((prevState) => [...prevState, message.body]);
        if (!!onUserJoin) onUserJoin(message.body);
      } else {
        setParticipants((prevState) => {
          const newState = [...prevState];
          newState.splice(
            newState.findIndex((prevParticipant) => prevParticipant.id === message.body.id),
            1
          );
          return newState;
        });

        if (!!onUserLeave) onUserLeave(message.body);
      }
    });

    return () => unsubscribeToMeetingParticipantsChanges(keys);
  }, [meetingID, onUserJoin, onUserLeave]);

  return participants;
};

export default useParticipants;
