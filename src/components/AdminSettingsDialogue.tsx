import React, { useEffect, useState } from "react";
import { TeamID } from "../types/Team";
import { getTeamMembers } from "../utils/TeamUtils";
import { getUserById } from "../utils/UserUtils";
import Dialogue from "./Dialogue";
import PrimaryTextfield from "./PrimaryTextfield";

interface AdminSettingsDialogueProps {
	setDialogueOpen: (value: boolean) => any;
	dialogueIsOpen?: boolean;
	teamName: string;
	teamID: TeamID;
}

const AdminSettingsDialogue: React.FC<AdminSettingsDialogueProps> = ({ teamName, teamID, ...rest }) => {
	const [teamMembers, setTeamMembers] = useState<React.ReactNode>();

	useEffect(() => {
		getTeamMembers(teamID).then(async ({ data: { members } }) => {
			setTeamMembers(
				await Promise.all(
					members.map(async member => {
						const user = await getUserById(member);
						return <div>{user.name}</div>;
					})
				)
			);
		});
	}, [teamID]);

	return (
		<Dialogue {...rest} title="Admin Settings">
			<div>
				<div>
					<div className="my-2">
						<span>Team Name</span>
					</div>
					<PrimaryTextfield value={teamName} />
				</div>
				<div>
					<div>
						<span>Members</span>
					</div>

					{/* fetch the team members and then show */ teamMembers}
				</div>
			</div>
		</Dialogue>
	);
};

export default AdminSettingsDialogue;
