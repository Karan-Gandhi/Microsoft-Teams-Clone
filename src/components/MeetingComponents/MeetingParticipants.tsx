import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import useParticipants from "../../hooks/useParticipants";
import { MeetingID } from "../../types/Meeting";
import SearchListItem from "../SearchListItem";

interface MeetingParticipantsProps {
  meetingID: MeetingID;
  showMeetingParticipants: boolean;
  toggleParticipants: React.Dispatch<React.SetStateAction<boolean>>;
}

const MeetingParticipants: React.FC<MeetingParticipantsProps> = ({ toggleParticipants, meetingID, showMeetingParticipants }) => {
  const [participantList, setParticipantList] = useState<React.ReactNode>(null);
  const participants = useParticipants(meetingID);

  useEffect(() => {
    setParticipantList(
      // eslint-disable-next-line react/no-array-index-key
      participants.map((participant, idx) => <SearchListItem name={participant.name} email="" key={idx} noDot />)
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
