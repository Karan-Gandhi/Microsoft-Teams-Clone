import CloseIcon from "@mui/icons-material/Close";
import { getAvatarSrc } from "../utils/AuthUtils";
import { getUserName } from "../utils/UserUtils";

interface SearchListItemProps {
	name: string;
	email: string;
	onClick?: () => any;
	noDot?: boolean;
	noPadding?: boolean;
	closeButton?: boolean;
	onClose?: () => any;
}

const SearchListItem: React.FC<SearchListItemProps> = ({
	name,
	email,
	onClick,
	noDot = false,
	noPadding = false,
	closeButton = false,
	onClose = () => {},
}) => {
	const avatarSrc = getAvatarSrc(name, 32);
	if (name === getUserName()) name += " (You)";

	return (
		<div
			className={`flex ${
				!noPadding && "px-4"
			} hover:bg-black cursor-pointer py-2 gap-2 items-center transition duration-200`}
			onClick={onClick}
		>
			<img src={avatarSrc} className="rounded-full" alt="" />
			<div className="font-medium">
				<span>{name}</span>
			</div>
			{!noDot && <div className="h-1.5 w-1.5 bg-white rounded-full"></div>}{" "}
			<div style={{ color: "#ffffff88" }} className="flex-grow">
				<span>{email}</span>
			</div>
			<div>{closeButton && <CloseIcon onClick={onClose} />}</div>
		</div>
	);
};

export default SearchListItem;
