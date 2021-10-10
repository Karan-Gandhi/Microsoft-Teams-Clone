import { TeamID } from "../types/Team";

interface TeamCardProps {
	id: TeamID;
	name: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ id, name }) => {
	return <div>{name}</div>;
};

export default TeamCard;
