import { useEffect, useState } from "react";
import { VideoEmitResponse } from "../../api/Responses";
import { subscribeToMeetingVideos, unsubscribeToMeetingVideos } from "../../utils/MeetingUtils";

interface MeetingVideosProps {}

const MeetingVideos: React.FC<MeetingVideosProps> = () => {
  const [availableVideos, setAvailableVideos] = useState<VideoEmitResponse[]>([]);
  // const [participants, setParticipants]

  useEffect(() => {
    let key = subscribeToMeetingVideos((data) => {
      setAvailableVideos((prevState) => {
        const index = prevState.findIndex((prevVideo) => prevVideo.id === data.body.id);
        if (index === -1) {
          return [...prevState, data.body];
        } else {
          const newState = [...prevState];
          newState[index].video = data.body.video;
          return newState;
        }
      });
    });

    return () => unsubscribeToMeetingVideos(key);
  }, []);

  return (
    <div>
      {availableVideos.map((video) => (
        <img src={video.video} key={video.id} alt="" />
      ))}
    </div>
  );
};

export default MeetingVideos;
