import { useEffect, useState } from "react";
import DefaultLoader from "../components/DefaultLoader";
import MessageComponent from "../components/MessageComponent";
import TeamHeadder from "../components/TeamHeader";
import Textfield from "../components/Textfield";
import { FeedType } from "../types/FeedItem";
import Message from "../types/Message";
import { TeamFeed, TeamID } from "../types/Team";
import { UserID } from "../types/User";
import { getTeamFeed } from "../utils/TeamUtils";

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
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getTeamFeed(id).then(data => {
			setFeed(data.data);
			setLoading(false);
		});
	}, [id]);

	if (isLoading) {
		return (
			<div className="w-full h-screen">
				<DefaultLoader />
			</div>
		);
	}

	return (
		<div className="w-full h-screen px-8 flex flex-col">
			<TeamHeadder setTabIndex={setTabIndex} />
			<div className="flex-grow flex flex-col">
				{tabIndex === 0 && (
					<div className="flex flex-col h-full">
						<div className="flex-grow">
							{feed?.messages.map(feedItem => {
								if (feedItem.type === FeedType.Message)
									return (
										<MessageComponent {...(feedItem.content as Message)} />
									);
								else return <div>Meeting</div>;
							})}
						</div>
						<div>
							<Textfield
								backgroundColor="#292929"
								placeholder="Start a new Conversation"
								className="py-4 px-4"
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default IndividualTeamRoute;
