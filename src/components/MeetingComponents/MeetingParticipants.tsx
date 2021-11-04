import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { MeetingID } from "../../types/Meeting";
import User from "../../types/User";
import { getMeetingParticipants } from "../../utils/MeetingUtils";
import SearchListItem from "../SearchListItem";

interface MeetingParticipantsProps {
  meetingID: MeetingID;
  toggleParticipants: React.Dispatch<React.SetStateAction<boolean>>;
}

const UPDATE_MEETING_PARTICIPANTS_RATE = 1e3;

const MeetingParticipants: React.FC<MeetingParticipantsProps> = ({ toggleParticipants, meetingID }) => {
  const [participants, setParticipants] = useState<User[]>([]);
  const [participantList, setParticipantList] = useState<React.ReactNode>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    getMeetingParticipants(meetingID).then((data) => {
      setParticipants(data.participants);
      interval = setInterval(() => {
        getMeetingParticipants(meetingID).then((data) => {
          setParticipants(data.participants);
        });
      }, UPDATE_MEETING_PARTICIPANTS_RATE);
    });

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [meetingID]);

  useEffect(() => {
    setParticipantList(
      // eslint-disable-next-line react/no-array-index-key
      participants.map((participant, idx) => <SearchListItem name={participant.name} email={participant.email} key={idx} noDot />)
    );
  }, [participants]);

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
