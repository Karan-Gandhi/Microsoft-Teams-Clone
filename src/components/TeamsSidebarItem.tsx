import { NavLink } from "react-router-dom";

interface TeamsSidebarItemProps {
	name: string;
	linkTo?: string;
}

const TeamsSidebarItem: React.FC<TeamsSidebarItemProps> = ({ name, linkTo = "/teams" }) => {
	return (
		<NavLink to={linkTo} className="teams-sidebar-item px-8 transition py-2" activeClassName="teams-sidebar-item-active">
			<span>{name}</span>
		</NavLink>
	);
};

export default TeamsSidebarItem;
