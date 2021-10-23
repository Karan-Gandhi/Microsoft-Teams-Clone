import { TeamID } from "../types/Team";
import { leaveUserFromTeam } from "../utils/UserUtils";
import Dialogue from "./Dialogue";
import MemberTable from "./MemberTable";
import PrimaryButton from "./PrimaryButton";

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
          {/* TODO: complete the leave team thing */}
          <PrimaryButton
            onClick={async () => {
              await leaveUserFromTeam(teamID);
              window.location.href = "/";
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
