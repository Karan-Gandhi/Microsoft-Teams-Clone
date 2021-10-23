import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import MainSidebarItem from "./MainSidebarItem";

interface MainSidebarProps {}

const MainSidebar: React.FC<MainSidebarProps> = () => {
  return (
    <div className="px-2 flex flex-col" style={{ backgroundColor: "#0a0a0a" }}>
      <div className="flex flex-col items-center justify-center flex-grow">
        <MainSidebarItem label="Activity" icon={<NotificationsIcon fontSize="medium" />} linkTo="/activity" />
        <MainSidebarItem label="Teams" icon={<PeopleIcon fontSize="medium" />} linkTo="/teams" />
        <MainSidebarItem label="To-Do" icon={<ListAltIcon fontSize="medium" />} linkTo="/todo" />
      </div>
      <div className="justify-self-end">
        <MainSidebarItem label="Logout" icon={<LogoutIcon fontSize="medium" />} linkTo="/logout" />
      </div>
    </div>
  );
};

export default MainSidebar;
