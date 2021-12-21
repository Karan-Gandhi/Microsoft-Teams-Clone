import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

import { getAvatarSrc } from "../../utils/AuthUtils";
import { getUserID } from "../../utils/UserUtils";
import { ParticipantVideoAudio } from "./MeetingVideos";

interface ParticipantVideoProps {
  currentParticipantVideoAudio: ParticipantVideoAudio;
  videoIsOn?: boolean;
  audioIsOn?: boolean;
  localVideo: React.ForwardedRef<HTMLVideoElement>;
  idx: number;
}

const ParticipantVideo: React.FC<ParticipantVideoProps> = ({ currentParticipantVideoAudio, videoIsOn, audioIsOn, localVideo, idx }) => {
  const { name, id } = currentParticipantVideoAudio.participant;
  const { videoOn, audioOn } = currentParticipantVideoAudio;

  return (
    <div
      key={id}
      className="flex items-center justify-center"
      style={idx % 2 === 0 ? { backgroundColor: "#313131" } : { backgroundColor: "#3b3a39" }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center px-8 py-4">
        <div className="flex-grow flex items-center justify-center">
          {(id !== getUserID() || !videoIsOn) && (
            <div>
              <img className="rounded-full" src={!videoOn ? getAvatarSrc(name, 100) : currentParticipantVideoAudio.video} alt="" />
            </div>
          )}
          {id === getUserID() && videoIsOn && (
            <div>
              <video autoPlay playsInline src="" ref={localVideo} />
            </div>
          )}
        </div>
        <div className="flex flex-row w-full">
          <div className="flex-grow" />
          <div className="flex gap-4">
            <div>
              <span>{id !== getUserID() ? name : "You"}</span>
            </div>
            <div className="flex gap-2">
              <div>
                {videoOn && <VideocamIcon fontSize="small" />}
                {!videoOn && <VideocamOffIcon fontSize="small" />}
              </div>
              <div>
                {audioOn && <MicIcon fontSize="small" />}
                {!audioOn && <MicOffIcon fontSize="small" />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipantVideo;
