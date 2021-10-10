import { useEffect, useRef, useState } from "react";
import DefaultLoader from "../components/DefaultLoader";
import MessageComponent from "../components/MessageComponent";
import TeamHeadder from "../components/TeamHeader";
import Textfield from "../components/Textfield";
import { FeedType } from "../types/FeedItem";
import Message from "../types/Message";
import { TeamFeed, TeamID } from "../types/Team";
import { UserID } from "../types/User";
import { getTeamFeed } from "../utils/TeamUtils";

const FEED_REFRESH_TIME = 1e3 * 10;

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
	const feedRef = useRef<HTMLDivElement>(null);
	const [feed, setFeed] = useState<TeamFeed>();
	const [tabIndex, setTabIndex] = useState<number>(0);
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getTeamFeed(id).then(data => {
			setFeed(data.data);
			setLoading(false);

			feedRef.current?.addEventListener("DOMNodeInserted", event => {
				const { currentTarget: target } = event;
				(target as HTMLDivElement).scroll({
					top: (target as HTMLDivElement).scrollHeight,
					behavior: "smooth",
				});
			});

			feedRef.current?.scroll({
				top: feedRef.current.scrollHeight,
				behavior: "auto",
			});

			setInterval(() => {
				getTeamFeed(id).then(data => {
					setFeed(data.data);
				});
			}, FEED_REFRESH_TIME);
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
		<div className="w-full h-screen pl-8 flex flex-col">
			<TeamHeadder setTabIndex={setTabIndex} />
			<div className="flex-grow flex flex-col">
				{tabIndex === 0 && (
					<div className="flex flex-col h-full">
						<div className="flex-grow h-1 overflow-auto pr-8" ref={feedRef}>
							{feed?.messages.map((feedItem, idx) => {
								if (feedItem.type === FeedType.Message)
									return (
										<MessageComponent
											key={idx}
											{...(feedItem.content as Message)}
											dateCreated={feedItem.dateCreated}
										/>
									);
								else return <div key={idx}>Meeting</div>;
							})}
						</div>
						<div className="pt-8 pr-8">
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
