import { getAvatarSrc } from "../utils/AuthUtils";
import { getUserName } from "../utils/UserUtils";

interface SearchListItemProps {
	name: string;
	email: string;
	onClick?: () => any;
	noDot?: boolean;
	noPadding?: boolean;
}

const SearchListItem: React.FC<SearchListItemProps> = ({ name, email, onClick, noDot = false, noPadding = false }) => {
	if (name === getUserName()) name += " (You)";

	return (
		<div
			className={`flex ${
				!noPadding && "px-4"
			} hover:bg-black cursor-pointer py-2 gap-2 items-center transition duration-200`}
			onClick={onClick}
		>
			<img src={getAvatarSrc(name, 32)} className="rounded-full" alt="" />
			<div className="font-medium">
				<span>{name}</span>
			</div>
			{!noDot && <div className="h-1.5 w-1.5 bg-white rounded-full"></div>}{" "}
			<div style={{ color: "#ffffff88" }}>
				<span>{email}</span>
			</div>
		</div>
	);
};

export default SearchListItem;
