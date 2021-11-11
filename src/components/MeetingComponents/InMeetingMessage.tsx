import { UserID } from "../../types/User";
import { getUserID } from "../../utils/UserUtils";

interface InMeetingMessageProps {
  userID: UserID;
  userName: string;
  message: string;
}

const InMeetingMessage: React.FC<InMeetingMessageProps> = ({ userName, message, userID }) => {
  const isMyMessage = userID === getUserID();
  if (isMyMessage) userName = "You";

  return (
    <div className={"flex " + (isMyMessage ? "flex-row-reverse" : "flex-row")}>
      <div
        className="flex flex-col mb-4 py-2 px-4 rounded-md min-w-2/3"
        style={isMyMessage ? { backgroundColor: "#323348", width: "fit-content" } : { backgroundColor: "#1d1d1d", width: "fit-content" }}
      >
        <div className="text-sm" style={{ color: "#e0e0e0" }}>
          <span>{userName}</span>
        </div>
        <div
          className="whitespace-pre-line"
          style={{
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
};

export default InMeetingMessage;
