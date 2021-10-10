import React, { useEffect, useState } from "react";
import DefaultLoader from "../components/DefaultLoader";
import TeamCard from "../components/TeamCard";
import { getTeamByID, getUserTeams } from "../utils/TeamUtils";

interface HomeRouteProps {}

const HomeRoute: React.FC<HomeRouteProps> = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [teamDisplay, setTeamDisplay] = useState<React.ReactNode>();

	useEffect(() => {
		getUserTeams().then(async teams => {
			// setUserTeams(teams.data.teams);
			setTeamDisplay(
				await Promise.all(
					teams.data.teams.map(async teamID => {
						const data = (await getTeamByID(teamID)).data;
						return <TeamCard key={data.id} {...data} />;
					})
				)
			);
			setLoading(false);
		});
	}, []);

	return (
		<div className="flex items-center justify-center w-full h-screen">
			{isLoading && <DefaultLoader />}
			{!isLoading && <div>{teamDisplay}</div>}
		</div>
	);
};

export default HomeRoute;
