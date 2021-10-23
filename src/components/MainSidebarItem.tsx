import React from "react";
import { NavLink } from "react-router-dom";

interface MainSidebarItemProps {
  label: string;
  icon: React.ReactElement;
  linkTo?: string;
  onClick?: () => any;
}

const MainSidebarItem: React.FC<MainSidebarItemProps> = ({ icon, label, linkTo = "/", onClick }) => {
  return (
    <NavLink
      to={linkTo}
      onClick={onClick}
      className="w-full flex flex-col items-center px-2 py-2 my-4 cursor-pointer main-sidebar-item rounded-md"
      activeClassName="main-sidebar-item-active"
    >
      <div className="">{icon}</div>
      <div className="text-xs">
        <span>{label}</span>
      </div>
    </NavLink>
  );
};

export default MainSidebarItem;
