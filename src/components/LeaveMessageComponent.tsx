import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import LeaveMessage from "../types/LeaveMessage";

interface LeaveMessageComponentProps extends LeaveMessage {
  dateCreated: number;
}

const LeaveMessageComponent: React.FC<LeaveMessageComponentProps> = ({ userLeave, dateCreated }) => {
  return (
    <div className="flex gap-6 my-2 items-center">
      <div style={{ color: "#696ba1" }}>
        <ExitToAppOutlinedIcon />
      </div>
      <div style={{ color: "#989898" }}>
        <span>{userLeave} left the team.</span>
      </div>
    </div>
  );
};

export default LeaveMessageComponent;
