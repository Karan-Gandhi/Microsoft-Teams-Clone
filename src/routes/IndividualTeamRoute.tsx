import { useEffect, useState } from "react";
import TeamHeadder from "../components/TeamHeader";
import Textfield from "../components/Textfield";
import { TeamFeed, TeamID } from "../types/Team";
import { UserID } from "../types/User";

interface IndividualTeamRouteProps {
	id: TeamID;
	name: string;
	members: UserID[]; // this will also contain the admin
	admin: UserID;
}

const IndividualTeamRoute: React.FC<IndividualTeamRouteProps> = ({
	id,
	name,
	members,
	admin,
}) => {
	const [feed, setFeed] = useState<TeamFeed>();
	const [tabIndex, setTabIndex] = useState<number>(0);
	const [isLoading, setLoading] = useState<boolean>(false);

	useEffect(() => {}, []);

	return (
		<div className="w-full h-screen px-8 flex flex-col">
			<TeamHeadder setTabIndex={setTabIndex} />
			<div className="flex-grow flex flex-col">
				<div className="flex-grow">asd</div>
				<div>
					<Textfield
						backgroundColor="#292929"
						placeholder="Start a new Conversation"
						className="py-4 px-4"
					/>
				</div>
			</div>
		</div>
	);
};

export default IndividualTeamRoute;
