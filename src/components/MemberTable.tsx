import { useEffect, useState } from "react";
import { TeamID } from "../types/Team";
import { getTeamMembers } from "../utils/TeamUtils";
import { getUserById } from "../utils/UserUtils";
import DefaultLoader from "./DefaultLoader";
import SearchListItem from "./SearchListItem";

interface MemberTableProps {
	teamID: TeamID;
	closeButton?: boolean;
	onClose?: () => any;
}

const MemberTable: React.FC<MemberTableProps> = ({ teamID, closeButton, onClose }) => {
	const [teamMembers, setTeamMembers] = useState<React.ReactNode>();
	const [isLoading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		getTeamMembers(teamID).then(async ({ data: { members } }) => {
			setTeamMembers(
				await Promise.all(
					members.map(async (member, idx) => {
						const user = await getUserById(member);
						return (
							<div className="" style={{ backgroundColor: "#00000000" }} key={user.id}>
								{idx !== 0 && <hr className="my-2" style={{ borderColor: "#00000044" }} />}
								<SearchListItem email={user.email} name={user.name} noDot closeButton={closeButton} onClose={onClose} />
							</div>
						);
					})
				)
			);
			setLoading(false);
		});
	}, [closeButton, onClose, teamID]);

	if (isLoading) return <DefaultLoader />;

	return (
		<div className="my-2">
			<div>{teamMembers}</div>
		</div>
	);
};

export default MemberTable;
