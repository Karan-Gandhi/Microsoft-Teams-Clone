import { useEffect, useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getTeamByID, getUserTeams } from "../utils/TeamUtils";
import TeamsSidebarItem from "./TeamsSidebarItem";

interface TeamsSidebarProps {
  onLoaded: () => any;
}

const TeamsSidebar: React.FC<TeamsSidebarProps> = ({ onLoaded }) => {
  const [sidebarItems, setSidebarItems] = useState<React.ReactNode>();

  useEffect(() => {
    getUserTeams().then(async (teams) => {
      setSidebarItems(
        await Promise.all(
          teams.data.teams.map(async (teamID) => {
            const data = (await getTeamByID(teamID)).data;
            return <TeamsSidebarItem key={data.id} name={data.name} linkTo={`/teams/${data.id}`} />;
          })
        )
      );
      onLoaded();
    });
  }, [onLoaded]);

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
        <div className="flex flex-col mt-2">{sidebarItems}</div>
      </div>
    </div>
  );
};

export default TeamsSidebar;
