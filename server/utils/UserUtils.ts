import { addData, getSnapshotWhere, readData } from "../services/Firestore";
import FirestoreCollections from "../types/FirestoreCollections";
import { TeamID } from "../types/Team";
import User, { UserID } from "../types/User";

export const getUserByID = async (userID: UserID) => await readData<User>(FirestoreCollections.USERS, userID);

export const updateUserData = async (userID: UserID, userData: User) =>
	await addData(FirestoreCollections.USERS, userID, userData);

export const userJoinTeam = async (teamID: TeamID, userID: UserID) => {
	const user = await getUserByID(userID);
	return await updateUserData(userID, {
		...user,
		teams: [...(user.teams || []), teamID],
	});
};

export const getUserTeams = async (userID: UserID) => (await readData<User>(FirestoreCollections.USERS, userID)).teams;

export const searchUserByEmail = async (email: string, searchSize: number, ignoreEmail: string) => {
	const users = await getSnapshotWhere(FirestoreCollections.USERS, "email", ">=", email)
		.where("email", "<=", email + "\uf8ff")
		.get();

	const searchResults: User[] = [];
	users.forEach(doc => {
		const user = doc.data() as User;
		delete user.password;
		delete user.teams;
		searchResults.push(user);
	});

	return searchResults.filter(({ email }) => email !== ignoreEmail).filter((_, idx) => idx <= searchSize - 1);
};
