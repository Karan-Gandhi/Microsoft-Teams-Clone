import { useEffect, useRef, useState } from "react";
import useParticipants from "../../hooks/useParticipants";
import { MeetingID } from "../../types/Meeting";
import User from "../../types/User";
import { getUserID } from "../../utils/UserUtils";
import { getMediaConstraints } from "../../utils/BrowserUtils";
import {
  sendVideoToServer,
  subscribeToMeetingVideos,
  turnOffVideo,
  turnOnVideo,
  unsubscribeToMeetingVideos,
} from "../../utils/MeetingUtils";
import { SocketMessageID } from "../../types/SocketServer/SocketMessage";
import ParticipantVideo from "./ParticipantVideo";

interface MeetingVideosProps {
  meetingID: MeetingID;
  videoIsOn: boolean;
  audioIsOn: boolean;
}

export interface ParticipantVideoAudio {
  participant: User;
  videoOn: boolean;
  audioOn: boolean;
  video?: string;
}

const VIDEO_EMIT_RATE = 0.05e3;

const MeetingVideos: React.FC<MeetingVideosProps> = ({ meetingID, videoIsOn, audioIsOn }) => {
  const participants = useParticipants(meetingID);
  const localVideo = useRef<HTMLVideoElement>(null);

  const [participantVideoAudio, setParticipantVideoAudio] = useState<ParticipantVideoAudio[]>([]);
  const [localStream, setLocalStream] = useState<MediaStream>();
  const [videoEmitInterval, setVideoEmitInterval] = useState<NodeJS.Timeout>();

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

  const getSnapshot = () => {
    if (!localVideo.current) return "";

    const canvas = document.createElement("canvas");
    const video = localVideo.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d")?.drawImage(video, 0, 0);
    const data = canvas.toDataURL("image/png");
    return data;
  };

  useEffect(() => {
    // TODO: run this on a different worker node and have emit messages on another node
    let keys = subscribeToMeetingVideos((message) => {
      console.log(message, SocketMessageID[message.id]);
      if (message.id === SocketMessageID.VIDEO_ON) {
        setParticipantVideoAudio((prevState) => {
          return prevState.map((element) => {
            if (element.participant.id === message.body.id) {
              return { ...element, videoOn: true };
            } else {
              return element;
            }
          });
        });
      } else if (message.id === SocketMessageID.VIDEO_OFF) {
        setParticipantVideoAudio((prevState) => {
          return prevState.map((element) => {
            if (element.participant.id === message.body.id) {
              return { ...element, videoOn: false };
            } else {
              return element;
            }
          });
        });
      } else {
        setParticipantVideoAudio((prevState) => {
          return prevState.map((element) => {
            if (element.participant.id === message.body.id) {
              return { ...element, video: message.body.video };
            } else {
              return element;
            }
          });
        });
      }
    });

    return () => unsubscribeToMeetingVideos(keys);
  }, []);

  useEffect(() => {
    if (videoIsOn) {
      navigator.mediaDevices
        .getUserMedia(getMediaConstraints(videoIsOn, audioIsOn))
        .then((stream) => {
          setLocalStream(stream);
          if (localVideo.current) localVideo.current.srcObject = stream;
          turnOnVideo();
          // now stream video
          setVideoEmitInterval(
            setInterval(() => {
              sendVideoToServer(getSnapshot());
            }, VIDEO_EMIT_RATE)
          );
        })
        .catch((error) => {
          turnOffVideo();
          setVideoEmitInterval((prevState) => {
            if (prevState) clearInterval(prevState);
            return undefined;
          });
          console.log(error);
        });
    } else {
      turnOffVideo();
      setVideoEmitInterval((prevState) => {
        if (prevState) clearInterval(prevState);
        return undefined;
      });

      setLocalStream((_localStream) => {
        _localStream?.getTracks().forEach((track) => track.stop());
        return undefined;
      });
    }
  }, [audioIsOn, videoIsOn]);

  return (
    <div className={`grid grid-cols-${getRowsCols()[1]} grid-rows-${getRowsCols()[0]} w-full h-full`}>
      {participantVideoAudio
        .sort((a) => (a.participant.id !== getUserID() ? +1 : -1))
        .filter((_, idx) => idx <= 8)
        .map((currentParticipantVideoAudio, idx) => (
          <ParticipantVideo
            key={idx.toString()}
            currentParticipantVideoAudio={currentParticipantVideoAudio}
            idx={idx}
            localVideo={localVideo}
            audioIsOn={audioIsOn}
            videoIsOn={videoIsOn}
          />
        ))}
    </div>
  );
};

export default MeetingVideos;
