import { useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSnackbar } from "../Snackbar";
import User, { UserID } from "../types/User";
import { createTeam } from "../utils/TeamUtils";
import { searchUserByEmail } from "../utils/UserUtils";
import Chip from "./Chip";
import Dialogue from "./Dialogue";
import PrimaryButton from "./PrimaryButton";
import SearchListItem from "./SearchListItem";
import Textfield from "./Textfield";

const DEBOUNCE_TIME_INTERVAL = 0.25e3;

interface CreateTeamDialogueProps {
  showCreateTeamDialogue: boolean;
  setShowCreateTeamDialogue: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateTeamDialogue: React.FC<CreateTeamDialogueProps> = ({ setShowCreateTeamDialogue, showCreateTeamDialogue }) => {
  const [addedUsers, setAddedUsers] = useState<User[]>([]);
  const [addUserEmail, setAddUserEmail] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  const { enqueueSnackbar } = useSnackbar();

  useDebounce(
    async () => {
      if (addUserEmail.length === 0) return setSearchResults([]);
      setSearchResults(await searchUserByEmail(addUserEmail));
    },
    DEBOUNCE_TIME_INTERVAL,
    [addUserEmail]
  );

  const handleCreateTeamSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createTeam(teamName, addedUsers);
      enqueueSnackbar("Sucessfully created Team");
      window.location.href = "/teams/" + data.id;
    } catch {
      enqueueSnackbar("Error creating team");
    }
  };

  const addUser = (user: User) => {
    // get the user and add
    if (addedUsers.findIndex((addedUser) => addedUser.id === user.id) !== -1) {
      setAddUserEmail("");
      return enqueueSnackbar("User is already added");
    }
    setAddedUsers([...addedUsers, user]);
  };

  const removeUser = (id: UserID) => {
    setAddedUsers(addedUsers.filter((user) => user.id !== id));
  };

  return (
    <Dialogue
      dialogueIsOpen={showCreateTeamDialogue}
      setDialogueOpen={setShowCreateTeamDialogue}
      title="Create a team"
      onClose={() => setShowCreateTeamDialogue(false)}
      minHeight="66.666%"
    >
      <form onSubmit={handleCreateTeamSubmit} className="flex flex-col flex-grow">
        <div className="">
          <div className="my-2">
            <span>Team name</span>
          </div>
          <Textfield backgroundColor="#353535" placeholder="Team name" onChange={setTeamName} />
        </div>

        <div className="my-2">
          <span>Add members</span>
        </div>

        {/* Make a new dialogue for members */}
        <div className="flex flex-row gap-2">
          <div className="flex-grow">
            <Textfield
              className="mb-0"
              backgroundColor="#353535"
              placeholder="Enter a email"
              value={addUserEmail}
              onChange={setAddUserEmail}
              onSubmit={async () => {
                const users = await searchUserByEmail(addUserEmail);
                if (users.length >= 1) {
                  addUser(users[0]);
                } else {
                  enqueueSnackbar("No such user found");
                }
              }}
            />

            <div className="absolute w-full">
              {searchResults.length !== 0 && (
                <div className="absolute py-2" style={{ backgroundColor: "#292929", boxShadow: "0px 16px 20px #00000055" }}>
                  {searchResults
                    .filter((result) => addedUsers.findIndex((user) => result.id === user.id) === -1)
                    .map((user) => (
                      <SearchListItem
                        key={user.id}
                        name={user.name}
                        email={user.email}
                        onClick={() => {
                          setAddUserEmail("");
                          addUser(user);
                        }}
                      />
                    ))}
                </div>
              )}
            </div>
          </div>

          <PrimaryButton
            onClick={async () => {
              // adds the best match
              const users = await searchUserByEmail(addUserEmail);
              if (users.length >= 1) {
                addUser(users[0]);
              } else {
                enqueueSnackbar("No such user found");
              }
            }}
          >
            Add
          </PrimaryButton>
        </div>

        <div className="flex-grow">
          <div className="flex gap-3 flex-wrap">
            <Chip title="You" className="text-sm" />
            {addedUsers.map((user) => (
              <Chip key={user.id} onClose={() => removeUser(user.id)}>
                <div className="flex gap-2 items-center">
                  <div className="font-medium text-sm">
                    <span>{user.name}</span>
                  </div>
                  <div className="text-sm text-gray-300">
                    <span>{user.email}</span>
                  </div>
                </div>
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <PrimaryButton type="submit">Create</PrimaryButton>
        </div>
      </form>
    </Dialogue>
  );
};

export default CreateTeamDialogue;
