import FilterListIcon from "@mui/icons-material/FilterList";
import TeamsSidebarItem from "./TeamsSidebarItem";

interface TeamsSidebarProps {}

const TeamsSidebar: React.FC<TeamsSidebarProps> = () => {
	return (
		<div style={{ backgroundColor: "#141414" }} className="lg:w-96 py-4">
			<div className="px-8 py-4 flex items-center">
				<span className="text-xl font-medium flex-grow">Teams</span>
				<FilterListIcon />
			</div>

			<div>
				<div className="px-8 mt-6 text-sm" style={{ color: "#adadad" }}>
					<span>Your Teams</span>
				</div>
				<div className="flex flex-col mt-2">
					<TeamsSidebarItem name="Team 1" linkTo="/teams/team1" />
					<TeamsSidebarItem name="Team 2" linkTo="/teams/team2" />
					<TeamsSidebarItem name="Team 3" linkTo="/teams/team3" />
					<TeamsSidebarItem name="Team 4" linkTo="/teams/team4" />
				</div>
			</div>
		</div>
	);
};

export default TeamsSidebar;
