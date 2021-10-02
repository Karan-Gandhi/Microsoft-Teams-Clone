import { v4 } from "uuid";
import FirestoreCollections from "../types/FirestoreCollections";
import User, { UserID } from "../types/User";
import { EmailAlreadyExistError } from "./AuthErrors";
import { addData, readDataWhere } from "./Firestore";

export const loginWithEmailAndPassword = async (email: string, password: string) => {};

export const createUserWithEmailAndPassword = async (name: string, email: string, password: string) => {
	const id: UserID = v4();
	const user: User = { id, name, email, password, teams: [] };

	const existingUsers = await readDataWhere(FirestoreCollections.USERS, "email", "==", email);

	// Email validation will be done at the client side only
	if (existingUsers.length !== 0) {
		throw EmailAlreadyExistError;
	}

	await addData<User>(FirestoreCollections.USERS, id, user);
};
