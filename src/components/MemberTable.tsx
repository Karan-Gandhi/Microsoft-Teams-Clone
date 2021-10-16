import { useEffect, useState } from "react";
import { TeamID } from "../types/Team";
import { getTeamMembers } from "../utils/TeamUtils";
import { getUserById } from "../utils/UserUtils";
import SearchListItem from "./SearchListItem";

interface MemberTableProps {
	teamID: TeamID;
}

const MemberTable: React.FC<MemberTableProps> = ({ teamID }) => {
	const [teamMembers, setTeamMembers] = useState<React.ReactNode>();

	useEffect(() => {
		getTeamMembers(teamID).then(async ({ data: { members } }) => {
			setTeamMembers(
				await Promise.all(
					members.map(async member => {
						const user = await getUserById(member);
						return (
							<div className="" style={{ backgroundColor: "#00000000" }} key={user.id}>
								<SearchListItem email={user.email} name={user.name} noDot />
								<hr className="my-2" style={{ borderColor: "#00000044" }} />
							</div>
						);
					})
				)
			);
		});
	}, [teamID]);

	return (
		<div className="my-2">
			<div>{teamMembers}</div>
		</div>
	);
};

export default MemberTable;
