import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import JoinMessage from "../../types/JoinMessage";

interface JoinMessageComponentProps extends JoinMessage {
  dateCreated: number;
}

const JoinMessageComponent: React.FC<JoinMessageComponentProps> = ({ userJoined, dateCreated }) => {
  return (
    <div className="flex gap-6 my-2 items-center">
      <div style={{ color: "#696ba1" }}>
        <PersonAddOutlinedIcon />
      </div>
      <div style={{ color: "#989898" }}>
        <span>{userJoined} joined the team.</span>
      </div>
    </div>
  );
};

export default JoinMessageComponent;
