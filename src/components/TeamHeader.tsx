import { useEffect, useState } from "react";
import TeamHeaderItem from "./TeamHeaderItem";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Button from "./Button";
import { getUserID } from "../utils/UserUtils";
import { UserID } from "../types/User";
import AdminSettingsDialogue from "./AdminSettingsDialogue";
import { TeamID } from "../types/Team";
import MembersDialogue from "./MembersDialogue";

interface TeamHeaderProps {
	setTabIndex: React.Dispatch<React.SetStateAction<number>>;
	adminID: UserID;
	teamName: string;
	teamID: TeamID;
	totalMembers: number;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ setTabIndex, adminID, teamName, teamID, totalMembers }) => {
	const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
	const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
	const [showMembersPanel, setShowMembersPanel] = useState<boolean>(false);
	const [showAdminSettings, setShowAdminSettings] = useState<boolean>(false);

	useEffect(() => setTabIndex(currentTabIndex), [currentTabIndex, setTabIndex]);
	useEffect(() => {
		if (adminID === getUserID()) setShowAdminSettings(true);
	}, [adminID]);

	return (
		<div className="flex py-8 pr-8">
			<div className="flex gap-8 flex-grow">
				<TeamHeaderItem label="Posts" active={currentTabIndex === 0} onClick={() => setCurrentTabIndex(0)} />
				<TeamHeaderItem label="Assignments" active={currentTabIndex === 1} onClick={() => setCurrentTabIndex(1)} />
			</div>
			<div className="flex gap-4 items-center">
				<Button
					backgroundColor="#00000000"
					hoverBackgroudColor="#000000aa"
					className="px-4 py-2 flex items-center justify-center gap-2"
					noPadding
				>
					<span>Create a new Meeting</span>
					<AddIcon />
				</Button>
				{showAdminSettings && <SettingsIcon className="cursor-pointer" onClick={() => setShowAdminPanel(true)} />}
				{!showAdminSettings && <GroupIcon className="cursor-pointer" onClick={() => setShowMembersPanel(true)} />}
				<AdminSettingsDialogue
					setDialogueOpen={setShowAdminPanel}
					dialogueIsOpen={showAdminPanel}
					teamName={teamName}
					teamID={teamID}
					totalMembers={totalMembers}
				/>
				<MembersDialogue
					setDialogueOpen={setShowMembersPanel}
					dialogueIsOpen={showMembersPanel}
					teamName={teamName}
					teamID={teamID}
					totalMembers={totalMembers}
				/>
			</div>
		</div>
	);
};

export default TeamHeader;
