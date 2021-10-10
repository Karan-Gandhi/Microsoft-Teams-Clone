import { useEffect, useState } from "react";
import TeamHeaderItem from "./TeamHeaderItem";

interface TeamHeaderProps {
	setTabIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ setTabIndex }) => {
	const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);

	useEffect(() => setTabIndex(currentTabIndex), [currentTabIndex, setTabIndex]);

	return (
		<div className="flex py-8 gap-8">
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
	);
};

export default TeamHeader;
