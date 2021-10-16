import { useEffect, useState } from "react";
import TeamHeaderItem from "./TeamHeaderItem";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Button from "./Button";
import { getUserID } from "../utils/UserUtils";
import { UserID } from "../types/User";

interface TeamHeaderProps {
	setTabIndex: React.Dispatch<React.SetStateAction<number>>;
	adminID: UserID;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ setTabIndex, adminID }) => {
	const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
	const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
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
				{
					// add the admin pannel
				}
			</div>
		</div>
	);
};

export default TeamHeader;
