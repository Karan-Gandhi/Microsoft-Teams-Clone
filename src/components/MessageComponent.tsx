import { UserID } from "../types/User";
import { getAvatarSrc } from "../utils/AuthUtils";
import { getFormattedDate } from "../utils/BrowserUtils";
import { getUserName } from "../utils/UserUtils";

interface MessageComponentProps {
	sender: UserID;
	content: string;
	dateCreated: number;
}

const MessageComponent: React.FC<MessageComponentProps> = ({ sender, content, dateCreated }) => {
	const avatarSrc = getAvatarSrc(sender, 48);
	if (sender === getUserName()) sender = "You";
	return (
		<div className={`flex items-center gap-4 ${sender === "You" ? "flex-row" : "flex-row"}`}>
			<div>
				<img src={avatarSrc} alt="" className="rounded-full" />
			</div>

			<div className="my-4 flex flex-col rounded-xl" style={{ backgroundColor: "#292929" }}>
				<div className="px-4 py-3 flex gap-4 pr-8">
					<span className="font-medium">{sender}</span>
					<span style={{ color: "#adadad" }}>{getFormattedDate(dateCreated)}</span>
				</div>
				<div className="px-4 py-2 mb-3 pr-8" style={{ backgroundColor: "#242424" }}>
					<span>{content}</span>
				</div>
			</div>
		</div>
	);
};

export default MessageComponent;
