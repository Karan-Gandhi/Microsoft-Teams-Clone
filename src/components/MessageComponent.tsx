import { UserID } from "../types/User";
import { getFormattedDate } from "../utils/BrowserUtils";

interface MessageComponentProps {
	sender: UserID;
	content: string;
	dateCreated: number;
}

const MessageComponent: React.FC<MessageComponentProps> = ({
	sender,
	content,
	dateCreated,
}) => {
	return (
		<div className="my-4 flex flex-col" style={{ backgroundColor: "#292929" }}>
			<div className="px-4 py-1 flex gap-4">
				<span className="font-medium">{sender}</span>
				<span style={{ color: "#adadad" }}>
					{getFormattedDate(dateCreated)}
				</span>
			</div>
			<div className="px-4 py-2" style={{ backgroundColor: "#242424" }}>
				<span>{content}</span>
			</div>
		</div>
	);
};

export default MessageComponent;
