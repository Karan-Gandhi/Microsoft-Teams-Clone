import React, { useCallback, useEffect, useRef, useState } from "react";
import DefaultLoader from "../components/DefaultLoader";
import MessageComponent from "../components/MessageComponent";
import TeamHeadder from "../components/TeamHeader";
import Textfield from "../components/Textfield";
import { useSnackbar } from "../Snackbar";
import { FeedType } from "../types/FeedItem";
import Message from "../types/Message";
import { TeamFeed, TeamID } from "../types/Team";
import { UserID } from "../types/User";
import { getTeamFeed, sendMessageOnTeam } from "../utils/TeamUtils";
import { getUserById } from "../utils/UserUtils";

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
	const [message, setMessage] = useState<string>("");
	const { enqueueSnackbar } = useSnackbar();
	const [messages, setMessages] = useState<React.ReactNode>();

	const updateFeed = useCallback(async () => {
		return getTeamFeed(id).then(async data => {
			setFeed(data.data);

			setMessages(
				await Promise.all(
					data.data.messages.map(async (feedItem, idx) => {
						if (feedItem.type === FeedType.Message) {
							const currentMessage = feedItem.content as Message;

							return (
								<MessageComponent
									key={idx}
									content={currentMessage.content}
									sender={currentMessage.name}
									dateCreated={feedItem.dateCreated}
								/>
							);
						} else return <div key={idx}>Meeting</div>;
					})
				)
			);
		});
	}, [id]);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (message.length === 0) return enqueueSnackbar("Please enter a message");
		await sendMessageOnTeam(id, message);
		await updateFeed();
	};

	useEffect(() => {
		updateFeed().then(() => {
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

			setInterval(async () => {
				await updateFeed();
			}, FEED_REFRESH_TIME);
		});
	}, [id, updateFeed]);

	useEffect(() => {
		feedRef.current?.scroll({
			top: feedRef.current.scrollHeight,
			behavior: "auto",
		});
	}, [tabIndex]);

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
							{messages}
						</div>
						<form onSubmit={handleSubmit}>
							<div className="pt-8 pr-8">
								<Textfield
									onChange={value => setMessage(value)}
									backgroundColor="#292929"
									placeholder="Start a new Conversation"
									className="py-4 px-4"
								/>
							</div>
						</form>
					</div>
				)}
			</div>
		</div>
	);
};

export default IndividualTeamRoute;
