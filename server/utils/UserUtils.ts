import { addData, readData } from "../services/Firestore";
import FirestoreCollections from "../types/FirestoreCollections";
import { TeamID } from "../types/Team";
import User, { UserID } from "../types/User";

export const getUserByID = async (userID: UserID) =>
	await readData<User>(FirestoreCollections.USERS, userID);

export const updateUserData = async (userID: UserID, userData: User) =>
	await addData(FirestoreCollections.USERS, userID, userData);

export const userJoinTeam = async (teamID: TeamID, userID: UserID) => {
	const user = await getUserByID(userID);
	return await updateUserData(userID, {
		...user,
		teams: [...user.teams, teamID],
	});
};

export const getUserTeams = async (userID: UserID) =>
	(await readData<User>(FirestoreCollections.USERS, userID)).teams;
