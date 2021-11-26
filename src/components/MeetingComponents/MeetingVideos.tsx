import { useEffect, useState } from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import useParticipants from "../../hooks/useParticipants";
import { MeetingID } from "../../types/Meeting";
import User from "../../types/User";
import { getAvatarSrc } from "../../utils/AuthUtils";

interface MeetingVideosProps {
  meetingID: MeetingID;
}

interface ParticipantVideoAudio {
  participant: User;
  videoOn: boolean;
  audioOn: boolean;
  video?: string;
}

const MeetingVideos: React.FC<MeetingVideosProps> = ({ meetingID }) => {
  const participants = useParticipants(meetingID);
  const [participantVideoAudio, setParticipantVideoAudio] = useState<ParticipantVideoAudio[]>([]);

  useEffect(() => {
    setParticipantVideoAudio(participants.map((participant) => ({ participant, videoOn: false, audioOn: false })));
  }, [participants]);

  const getRowsCols = () => {
    switch (participants.length) {
      case 1:
        return [1, 1];
      case 2:
        return [1, 2];
      case 3:
        return [1, 3];
      case 4:
        return [2, 2];
      case 5:
      case 6:
        return [2, 3];
      default:
        return [3, 3];
    }
  };

  return (
    <div className={`grid grid-cols-${getRowsCols()[1]} grid-rows-${getRowsCols()[0]} w-full h-full`}>
      {participantVideoAudio
        .filter((_, idx) => idx <= 8)
        .map((currentParticipantVideoAudio, idx) => (
          <div
            key={currentParticipantVideoAudio.participant.id}
            className="flex items-center justify-center"
            style={idx % 2 === 0 ? { backgroundColor: "#313131" } : { backgroundColor: "#3b3a39" }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center px-8 py-4">
              <div className="flex-grow flex items-center justify-center">
                <div>
                  <img
                    className="rounded-full"
                    src={
                      !currentParticipantVideoAudio.videoOn
                        ? getAvatarSrc(currentParticipantVideoAudio.participant.name, 100)
                        : currentParticipantVideoAudio.video
                    }
                    alt=""
                  />
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex-grow" />
                <div className="flex gap-4">
                  <div>
                    <span>{currentParticipantVideoAudio.participant.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <div>
                      {currentParticipantVideoAudio.videoOn && <VideocamIcon fontSize="small" />}
                      {!currentParticipantVideoAudio.videoOn && <VideocamOffIcon fontSize="small" />}
                    </div>
                    <div>
                      {currentParticipantVideoAudio.audioOn && <MicIcon fontSize="small" />}
                      {!currentParticipantVideoAudio.audioOn && <MicOffIcon fontSize="small" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MeetingVideos;
