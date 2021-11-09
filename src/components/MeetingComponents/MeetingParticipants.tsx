import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { MeetingID } from "../../types/Meeting";
import { SocketMessageID } from "../../types/SocketServer/SocketMessage";
import User from "../../types/User";
import {
  getMeetingParticipants,
  subscribeToMeetingParticipantsChanges,
  unsubscribeToMeetingParticipantsChanges,
} from "../../utils/MeetingUtils";
import SearchListItem from "../SearchListItem";

interface MeetingParticipantsProps {
  meetingID: MeetingID;
  showMeetingParticipants: boolean;
  toggleParticipants: React.Dispatch<React.SetStateAction<boolean>>;
}

const MeetingParticipants: React.FC<MeetingParticipantsProps> = ({ toggleParticipants, meetingID, showMeetingParticipants }) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [participantList, setParticipantList] = useState<React.ReactNode>(null);

  useEffect(() => {
    getMeetingParticipants(meetingID).then((data) => {
      setParticipants(data.participants);
    });

    let keys = subscribeToMeetingParticipantsChanges((message) => {
      if (message.id === SocketMessageID.USER_JOINED_MEETING) {
        setParticipants((prevState) => [...prevState, message.body]);
      } else {
        setParticipants((prevState) => {
          const newState = [...prevState];
          newState.splice(
            newState.findIndex((prevParticipant) => prevParticipant.id === message.body.id),
            1
          );
          return newState;
        });
      }
    });

    return () => unsubscribeToMeetingParticipantsChanges(keys);
  }, [meetingID]);

  useEffect(() => {
    setParticipantList(
      // eslint-disable-next-line react/no-array-index-key
      participants.map((participant, idx) => <SearchListItem name={participant.name} email={participant.email} key={idx} noDot />)
    );
  }, [participants]);

  if (!showMeetingParticipants) return <div className="absolute" />;

  return (
    <div className="px-8 py-8 flex flex-col" style={{ backgroundColor: "#141414" }}>
      <div className="flex w-full mb-4">
        <div className="text-xl font-medium mr-32 flex-grow">
          <span>Participants ({participants.length})</span>
        </div>
        <div className="cursor-pointer">
          <CloseIcon onClick={() => toggleParticipants(false)} />
        </div>
      </div>

      <div className="flex-grow h-1 overflow-auto pr-8">{participantList}</div>
    </div>
  );
};

export default MeetingParticipants;
