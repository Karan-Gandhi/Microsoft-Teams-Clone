import PhotoCameraFrontIcon from "@mui/icons-material/PhotoCameraFront";
import { getAvatarSrc } from "../utils/AuthUtils";
import { getFormattedDate } from "../utils/BrowserUtils";
import { getUserName } from "../utils/UserUtils";

interface MeetingMessageProps {}

const MeetingMessage: React.FC<MeetingMessageProps> = () => {
	let sender = "Karan Gandhi 1";
	const meetingTitle = "Group Draft Session";
	const dateCreated = 1634543421405;
	const meetingTime = 1634543421405;

	const avatarSrc = getAvatarSrc(sender, 48);
	if (sender === getUserName()) sender = "You";
	return (
		<div className="my-4 flex flex-col rounded-xl" style={{ backgroundColor: "#292929" }}>
			<div className="flex px-4 py-2 items-center">
				<div>
					<img src={avatarSrc} alt="" className="rounded-full" />
				</div>
				<div className="flex flex-col px-4 py-2">
					<div className=" flex gap-4 pr-8">
						<span className="font-medium">{sender}</span>
						<span style={{ color: "#adadad" }}>{getFormattedDate(dateCreated)}</span>
					</div>
					<div>
						<span>Scheduled a meeting</span>
					</div>
				</div>
			</div>
			<div
				className="flex items-center gap-4 px-4 py-4 pr-8 rounded-bl-xl rounded-br-xl"
				style={{ backgroundColor: "#6264a7" }}
			>
				<PhotoCameraFrontIcon fontSize="large" />
				<div className="flex flex-col">
					<div className="font-medium">
						<span>{meetingTitle}</span>
					</div>
					<div>
						<span>
							{new Date(meetingTime).toDateString()} @ {new Date(meetingTime).toLocaleTimeString()}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MeetingMessage;
