import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLoader from "../components/DefaultLoader";
import MeetingHeader from "../components/MeetingComponents/MeetingHeader";
import Meeting, { MeetingID } from "../types/Meeting";
import { getMeetingById, joinMeeting } from "../utils/MeetingUtils";

interface Match {
  id: MeetingID;
}

interface MeetingRouteProps extends RouteComponentProps<Match> {}

const MeetingRoute: React.FC<MeetingRouteProps> = ({ match }) => {
  const [meeting, setMeeting] = useState<Meeting>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [videoIsOn, setVideoOn] = useState<boolean>(false);
  const [audioIsOn, setAudioOn] = useState<boolean>(false);

  useEffect(() => {
    getMeetingById(match.params.id)
      .then((meeting) => {
        setMeeting(meeting);
        joinMeeting(meeting);
      })
      .catch((error) => {
        setLoading(false);
        // TODO: Send 404 page
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match.params.id]);

  if (isLoading || !meeting)
    return (
      <div className="w-full h-screen">
        <DefaultLoader />
      </div>
    );

  return (
    <div>
      <MeetingHeader
        meetingID={meeting.meetingID}
        meetingName={meeting.meetingName}
        videoIsOn={videoIsOn}
        audioIsOn={audioIsOn}
        toggleAudio={setAudioOn}
        toggleVideo={setVideoOn}
      />
    </div>
  );
};

export default MeetingRoute;
