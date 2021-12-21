import { TeamID } from "../../types/Team";
import { redirectTo } from "../../utils/BrowserUtils";
import { leaveUserFromTeam } from "../../utils/UserUtils";
import MemberTable from "../MemberTable";
import PrimaryButton from "../PrimaryButton";
import Dialogue from "./Dialogue";

interface MembersDialogueProps {
  setDialogueOpen: (value: boolean) => any;
  dialogueIsOpen?: boolean;
  teamName: string;
  teamID: TeamID;
  totalMembers: number;
}

const MembersDialogue: React.FC<MembersDialogueProps> = ({ teamName, teamID, totalMembers, ...rest }) => {
  return (
    <Dialogue {...rest} title={"Members - " + teamName}>
      <div className="flex flex-col flex-grow">
        <div className="mt-4 flex-grow">
          <MemberTable teamID={teamID} />
        </div>
        <div className="py-2 mt-8">
          <PrimaryButton
            onClick={async () => {
              await leaveUserFromTeam(teamID);
              redirectTo("/");
            }}
          >
            Leave Team
          </PrimaryButton>
        </div>
      </div>
    </Dialogue>
  );
};

export default MembersDialogue;
