import { useEffect, useState } from "react";
import TeamHeaderItem from "./TeamHeaderItem";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import Button from "./Button";

interface TeamHeaderProps {
	setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ setTabIndex }) => {
	const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

	useEffect(() => setTabIndex(currentTabIndex), [currentTabIndex, setTabIndex]);

	return (
		<div className="flex py-8 pr-8">
			<div className="flex gap-8 flex-grow">
				<TeamHeaderItem
					label="Posts"
					active={currentTabIndex === 0}
					onClick={() => setCurrentTabIndex(0)}
				/>
				<TeamHeaderItem
					label="Assignments"
					active={currentTabIndex === 1}
					onClick={() => setCurrentTabIndex(1)}
				/>
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
				<SettingsIcon className="cursor-pointer" />
			</div>
		</div>
	);
};

export default TeamHeader;
