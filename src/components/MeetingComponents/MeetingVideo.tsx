import { useEffect, useRef, useState } from "react";
import { useSnackbar } from "../../Snackbar";
import { sendVideoToServer } from "../../utils/MeetingUtils";

interface MeetingVideoProps {
  videoIsOn: boolean;
}

const VIDEO_EMIT_RATE = 0.1e3;

const MeetingVideo: React.FC<MeetingVideoProps> = ({ videoIsOn }) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { enqueueSnackbar } = useSnackbar();

  const getFrame = (): string | undefined => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0);
      const data = canvas.toDataURL("image/png");
      return data;
    }
  };

  useEffect(() => {
    if (videoIsOn) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((value) => {
          setMediaStream(value);
          if (videoRef.current) videoRef.current.srcObject = value;
        })
        .catch((error) => enqueueSnackbar("Some error occoured while starting the camera"));
    } else {
      setMediaStream((stream) => {
        stream?.getTracks().forEach((track) => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
        return undefined;
      });
    }
  }, [enqueueSnackbar, videoIsOn]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mediaStream) {
      interval = setInterval(() => {
        sendVideoToServer(getFrame() || "");
      }, VIDEO_EMIT_RATE);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mediaStream]);

  const handleCanPlay = () => {
    videoRef.current?.play();
  };

  return (
    <div>
      <video onCanPlay={handleCanPlay} autoPlay playsInline muted ref={videoRef} />
    </div>
  );
};

export default MeetingVideo;
