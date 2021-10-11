import { Link } from "react-router-dom";
import { TeamID } from "../types/Team";
import { getAvatarSrc } from "../utils/AuthUtils";

interface TeamCardProps {
	id: TeamID;
	name: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ id, name }) => {
	return (
		<Link
			to={`/teams/${id}`}
			className="my-6 mx-4 px-8 py-4 flex flex-col items-center rounded-md"
			style={{ backgroundColor: "#292929" }}
		>
			<div>
				<img src={getAvatarSrc(name, 200)} alt="" className="rounded-md" />
			</div>
			<div className="mt-2 text-lg">
				<span>{name}</span>
			</div>
		</Link>
	);
};

export default TeamCard;
