import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useSnackbar } from "../Snackbar";
import { TeamID } from "../types/Team";
import User, { UserID } from "../types/User";
import { addMemberToTeam, getTeamMembers } from "../utils/TeamUtils";
import { getUserById, searchUserByEmail } from "../utils/UserUtils";
import Dialogue from "./Dialogue";
import MemberTable from "./MemberTable";
import PrimaryButton from "./PrimaryButton";
import SearchListItem from "./SearchListItem";
import Textfield from "./Textfield";

const DEBOUNCE_TIME_INTERVAL = 0.25e3;

interface AddMembersDialogueProps {
	setDialogueOpen: (value: boolean) => any;
	dialogueIsOpen?: boolean;
	teamID: TeamID;
}

const AddMembersDialogue: React.FC<AddMembersDialogueProps> = ({ teamID, ...rest }) => {
	const [addUserEmail, setAddUserEmail] = useState<string>("");
	const [addedUsers, setAddedUsers] = useState<User[]>([]);
	const [searchResults, setSearchResults] = useState<User[]>([]);
	const { enqueueSnackbar } = useSnackbar();

	const addUser = async (user: User) => {
		// get the user and add
		if (addedUsers.findIndex(addedUser => addedUser.id === user.id) !== -1) {
			setAddUserEmail("");
			return enqueueSnackbar("User is already added");
		}
		setAddedUsers([...addedUsers, user]);
		await addMemberToTeam(teamID, user.id);
	};

	const removeUser = (id: UserID) => {
		setAddedUsers(addedUsers.filter(user => user.id !== id));
	};

	useDebounce(
		async () => {
			if (addUserEmail.length === 0) return setSearchResults([]);
			setSearchResults(await searchUserByEmail(addUserEmail, addedUsers));
		},
		DEBOUNCE_TIME_INTERVAL,
		[addUserEmail]
	);

	useEffect(() => {
		getTeamMembers(teamID).then(async ({ data: { members } }) => {
			setAddedUsers(await Promise.all(members.map(async member => await getUserById(member))));
		});
	}, [teamID]);

	return (
		<Dialogue title="Manage Members" {...rest}>
			<div>
				<div className="flex flex-row gap-2">
					<div className="flex-grow">
						<Textfield
							className="mb-0"
							backgroundColor="#353535"
							placeholder="Enter a email"
							value={addUserEmail}
							onChange={setAddUserEmail}
							onSubmit={async () => {
								const users = await searchUserByEmail(addUserEmail, addedUsers);
								if (users.length >= 1) {
									await addUser(users[0]);
								} else {
									enqueueSnackbar("No such user found");
								}
							}}
						/>

						<div className="absolute w-full">
							{searchResults.length !== 0 && (
								<div
									className="absolute py-2"
									style={{ backgroundColor: "#292929", boxShadow: "0px 16px 20px #00000055" }}
								>
									{searchResults.map(user => (
										<SearchListItem
											key={user.id}
											name={user.name}
											email={user.email}
											onClick={async () => {
												setAddUserEmail("");
												await addUser(user);
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
							const users = await searchUserByEmail(addUserEmail, addedUsers);
							if (users.length >= 1) {
								await addUser(users[0]);
							} else {
								enqueueSnackbar("No such user found");
							}
						}}
					>
						Add
					</PrimaryButton>
				</div>
				<div>
					{/* TODO: Remove the user */}
					<MemberTable
						teamID={teamID}
						closeButton
						onClose={user => {
							// cant remove yourself
							console.log(user);
						}}
					/>
				</div>
			</div>
		</Dialogue>
	);
};

export default AddMembersDialogue;
