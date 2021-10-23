import { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import GroupIcon from "@mui/icons-material/Group";
import { useSnackbar } from "../Snackbar";
import { getTeamByID, joinTeam } from "../utils/TeamUtils";
import CreateTeamDialogue from "./CreateTeamDialogue";
import Dialogue from "./Dialogue";
import PrimaryButton from "./PrimaryButton";
import Textfield from "./Textfield";

interface JoinTeamDialogeProps {
  dialogueIsOpen?: boolean;
  setDialogueOpen: (value: boolean) => any;
}

const JoinTeamDialoge: React.FC<JoinTeamDialogeProps> = ({ dialogueIsOpen = false, setDialogueOpen }) => {
  const [teamCode, setTeamCode] = useState<string>("");
  const [showCreateTeamDialogue, setShowCreateTeamDialogue] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (teamCode.length === 0) return enqueueSnackbar("Please enter a team code");

    try {
      await getTeamByID(teamCode);
      await joinTeam(teamCode);
      enqueueSnackbar("Sucessfully joined team");
      window.location.href = "/teams/" + teamCode;
    } catch {
      enqueueSnackbar("No such team found, please re-enter the code");
    }
  };

  return (
    <>
      <CreateTeamDialogue showCreateTeamDialogue={showCreateTeamDialogue} setShowCreateTeamDialogue={setShowCreateTeamDialogue} />
      <Dialogue dialogueIsOpen={dialogueIsOpen && !showCreateTeamDialogue} setDialogueOpen={setDialogueOpen} title="Join or Create a team">
        <div className="pb-2 flex">
          <form onSubmit={handleSubmit} className="flex flex-col items-center py-8 px-2 w-1/2" style={{ backgroundColor: "#292929" }}>
            <GroupIcon fontSize="large" />
            <div className="mb-2 font-medium text-lg">
              <span>Join a team with a code</span>
            </div>

            <Textfield backgroundColor="#353535" placeholder="Enter code" onChange={setTeamCode} />

            <div className="text-xs mb-4 mt-2 text-gray-300 flex">
              <span className="text-center">Got a code to join a team? Enter it above</span>
            </div>

            <div className="flex">
              <div className="w-fit">
                <PrimaryButton type="submit">Join Team</PrimaryButton>
              </div>
            </div>
          </form>

          <div className="flex flex-col items-center py-8 px-2 w-1/2" style={{ backgroundColor: "#292929" }}>
            <CreateIcon fontSize="large" />
            <div className="mb-2 font-medium text-lg flex-grow">
              <span>Create a team</span>
            </div>

            <div className="text-xs mb-4 mt-2 text-gray-300 flex">
              <span className="text-center">Bring everyone together and get to work!</span>
            </div>

            <div className="flex">
              <div className="w-fit">
                <PrimaryButton onClick={() => setShowCreateTeamDialogue(true)}>Create a team</PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </Dialogue>
    </>
  );
};

export default JoinTeamDialoge;
