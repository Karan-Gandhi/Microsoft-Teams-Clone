import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "../../Snackbar";
import { MeetingID, MeetingParticipantsMessage } from "../../types/Meeting";
import { sendMessageInMeeting, subscribeToMeetingMessages, unsubscribeToMeetingMessages } from "../../utils/MeetingUtils";
import { getUserID } from "../../utils/UserUtils";
import PrimaryTextfield from "../PrimaryTextfield";

interface MeetingChatProps {
  showChat: boolean;
  meetingID: MeetingID;
  toggleChat: React.Dispatch<React.SetStateAction<boolean>>;
}

const MeetingChat: React.FC<MeetingChatProps> = ({ toggleChat, showChat, meetingID }) => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<MeetingParticipantsMessage[]>([]);
  const [messageList, setMessageList] = useState<React.ReactNode>(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    let key = subscribeToMeetingMessages((data) => {
      if (data.body.userID !== getUserID()) enqueueSnackbar(data.body.userName + " sent a message");
      setMessages((prevMessages) => [...prevMessages, data.body]);
    });

    return () => unsubscribeToMeetingMessages(key);
  }, [enqueueSnackbar]);

  useEffect(() => {
    // eslint-disable-next-line react/no-array-index-key
    setMessageList(messages.map((currentMessage, idx) => <div key={idx}>{JSON.stringify(currentMessage)}</div>));
  }, [messages]);

  if (!showChat) return <div className="absolute" />;
  return (
    <div className="px-8 py-8 flex flex-col min-w-128" style={{ backgroundColor: "#141414" }}>
      <div className="flex w-full mb-4">
        <div className="text-xl font-medium mr-32 flex-grow">
          <span>Chat</span>
        </div>
        <div className="cursor-pointer">
          <CloseIcon onClick={() => toggleChat(false)} />
        </div>
      </div>

      <div className="flex flex-col flex-grow">
        <div className="flex-grow">{messageList}</div>
        <div>
          <PrimaryTextfield
            placeholder="Enter a message"
            onSubmit={() => {
              sendMessageInMeeting(message, meetingID);
              setMessage("");
            }}
            onChange={setMessage}
            value={message}
          />
        </div>
      </div>
    </div>
  );
};

export default MeetingChat;
