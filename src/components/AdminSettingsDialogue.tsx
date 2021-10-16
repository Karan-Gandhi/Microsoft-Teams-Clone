import React from "react";
import { TeamID } from "../types/Team";
import Dialogue from "./Dialogue";
import PrimaryTextfield from "./PrimaryTextfield";
import AddIcon from "@mui/icons-material/Add";
import MemberTable from "./MemberTable";

interface AdminSettingsDialogueProps {
	setDialogueOpen: (value: boolean) => any;
	dialogueIsOpen?: boolean;
	teamName: string;
	teamID: TeamID;
}

const AdminSettingsDialogue: React.FC<AdminSettingsDialogueProps> = ({ teamName, teamID, ...rest }) => {
	return (
		<Dialogue {...rest} title="Admin Settings">
			<div>
				<div className="px-4">
					<div className="my-2 text-xl font-medium">
						<span>Team Name</span>
					</div>
					<PrimaryTextfield value={teamName} />
				</div>
				<div className="mt-4">
					<div className="flex items-center px-4">
						<div className="text-xl font-medium flex-grow">
							<span>Members</span>
						</div>

						<AddIcon />
					</div>

					<MemberTable teamID={teamID} />
				</div>
			</div>
		</Dialogue>
	);
};

export default AdminSettingsDialogue;
