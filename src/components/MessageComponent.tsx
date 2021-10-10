import { UserID } from "../types/User";

interface MessageComponentProps {
	sender: UserID;
	content: string;
}

const MessageComponent: React.FC<MessageComponentProps> = ({
	sender,
	content,
}) => {
	return (
		<div>
			{sender}
			{content}
		</div>
	);
};

export default MessageComponent;
