import PeopleIcon from "@mui/icons-material/People";
import ChatIcon from "@mui/icons-material/Chat";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import IconButton from "../IconButton";
import Button from "../Button";
import { leaveMeeting } from "../../utils/MeetingUtils";
import { MeetingID } from "../../types/Meeting";

interface MeetingHeaderProps {
  meetingName: string;
  meetingID: MeetingID;
  videoIsOn?: boolean;
  audioIsOn?: boolean;
  toggleVideo: (value: boolean) => any;
  toggleAudio: (value: boolean) => any;
}

const MeetingHeader: React.FC<MeetingHeaderProps> = ({
  meetingName,
  videoIsOn = false,
  audioIsOn = false,
  toggleAudio,
  toggleVideo,
  meetingID,
}) => {
  return (
    <div className="flex w-full py-4 px-8 items-center" style={{ backgroundColor: "#292828" }}>
      <div className="text-xl flex-grow">
        <span>{meetingName}</span>
      </div>
      <div className="flex gap-2">
        <IconButton>
          <PeopleIcon />
        </IconButton>
        <IconButton>
          <ChatIcon />
        </IconButton>
        <IconButton onClick={() => toggleVideo(!videoIsOn)}>
          {videoIsOn && <VideocamIcon />}
          {!videoIsOn && <VideocamOffIcon />}
        </IconButton>
        <IconButton className="mr-2" onClick={() => toggleAudio(!audioIsOn)}>
          {audioIsOn && <MicIcon />}
          {!audioIsOn && <MicOffIcon />}
        </IconButton>
        <Button
          backgroundColor="#9d2f42"
          hoverBackgroudColor="#752331"
          color="#fff"
          hoverColor="#fff"
          noPadding
          noRounded
          className="px-4 py-2 rounded-md"
          onClick={async () => {
            await leaveMeeting(meetingID);
          }}
        >
          <div className="flex flex-row gap-2">
            <div>
              <CallEndIcon />
            </div>
            <div>
              <span>Leave Meeting</span>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default MeetingHeader;
