import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TeamID } from "../../types/Team";
import PrimaryTextfield from "../PrimaryTextfield";
import MemberTable from "../MemberTable";
import AddMembersDialogue from "./AddMembersDialogue";
import Dialogue from "./Dialogue";

interface AdminSettingsDialogueProps {
  setDialogueOpen: (value: boolean) => any;
  dialogueIsOpen?: boolean;
  teamName: string;
  teamID: TeamID;
  totalMembers: number;
}

const AdminSettingsDialogue: React.FC<AdminSettingsDialogueProps> = ({ teamName, teamID, totalMembers, ...rest }) => {
  const [addMembersDialogueIsOpen, setAddMembersDialogueOpen] = useState<boolean>(false);

  return (
    <>
      <AddMembersDialogue dialogueIsOpen={addMembersDialogueIsOpen} setDialogueOpen={setAddMembersDialogueOpen} teamID={teamID} />
      <Dialogue {...rest} dialogueIsOpen={rest.dialogueIsOpen && !addMembersDialogueIsOpen} title="Admin Settings">
        <div>
          <div className="px-4">
            <div className="my-2 text-xl font-medium">
              <span>Team Name</span>
            </div>
            <PrimaryTextfield value={teamName} />
          </div>
          <div className="mt-4">
            <div className="flex items-center px-4">
              <div className="text-xl font-medium flex-grow">
                <span>Members ({totalMembers})</span>
              </div>

              <AddIcon className="cursor-pointer" onClick={() => setAddMembersDialogueOpen(true)} />
            </div>

            <MemberTable teamID={teamID} />
          </div>
        </div>
      </Dialogue>
    </>
  );
};

export default AdminSettingsDialogue;
