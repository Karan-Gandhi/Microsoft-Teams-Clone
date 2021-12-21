import { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import DefaultLoader from "../components/DefaultLoader";
import MeetingChat from "../components/MeetingComponents/MeetingChat";
import MeetingHeader from "../components/MeetingComponents/MeetingHeader";
import MeetingParticipants from "../components/MeetingComponents/MeetingParticipants";
import MeetingVideos from "../components/MeetingComponents/MeetingVideos";
import Meeting, { MeetingID } from "../types/Meeting";
import { getMeetingById, joinMeeting, leaveMeeting } from "../utils/MeetingUtils";

interface Match {
  id: MeetingID;
}

interface MeetingRouteProps extends RouteComponentProps<Match> {}

const MeetingRoute: React.FC<MeetingRouteProps> = ({ match }) => {
  const [meeting, setMeeting] = useState<Meeting>();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [videoIsOn, setVideoOn] = useState<boolean>(false);
  const [audioIsOn, setAudioOn] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [showParticipants, setShowParticipants] = useState<boolean>(false);

  useEffect(() => {
    getMeetingById(match.params.id)
      .then((meeting) => {
        setMeeting(meeting);
        joinMeeting(meeting);
      })
      .catch((error) => {
        setLoading(false);
        // TODO: Send to 404 page
      })
      .finally(() => {
        setLoading(false);
      });
  }, [match.params.id]);

  useEffect(() => {
    return () => {
      if (meeting) leaveMeeting(meeting.meetingID);
    };
  }, [meeting]);

  if (isLoading || !meeting)
    return (
      <div className="w-full h-screen">
        <DefaultLoader />
      </div>
    );

  return (
    <div className="flex flex-col h-full">
      <MeetingHeader
        meetingID={meeting.meetingID}
        meetingName={meeting.meetingName}
        videoIsOn={videoIsOn}
        audioIsOn={audioIsOn}
        toggleAudio={setAudioOn}
        toggleVideo={setVideoOn}
        toggleChat={setShowChat}
        toggleParticipants={setShowParticipants}
      />
      <div className="flex flex-grow">
        <div className="flex-grow h-full">
          <MeetingVideos meetingID={meeting.meetingID} videoIsOn={videoIsOn} audioIsOn={audioIsOn} />
        </div>
        <MeetingParticipants
          showMeetingParticipants={showParticipants}
          toggleParticipants={setShowParticipants}
          meetingID={meeting.meetingID}
        />
        <MeetingChat toggleChat={setShowChat} showChat={showChat} meetingID={meeting.meetingID} />
      </div>
    </div>
  );
};

export default MeetingRoute;
