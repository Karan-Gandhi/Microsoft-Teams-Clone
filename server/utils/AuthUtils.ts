import * as jwt from "jsonwebtoken";
import { v4 } from "uuid";
import FirestoreCollections from "../types/FirestoreCollections";
import User, { UserID } from "../types/User";
import { EmailAlreadyExistError, InvalidEmailOrPassword } from "./AuthErrors";
import { addData, readDataWhere } from "../services/Firestore";
import { AccessTokenTypes, Token } from "../types/AccessToken";

export const loginWithEmailAndPassword = async (email: string, password: string) => {
	const existingUsers = await readDataWhere<User>(FirestoreCollections.USERS, "email", "==", email);
	if (existingUsers.length !== 1) {
		throw InvalidEmailOrPassword;
	}
	const user = existingUsers[0];

	if (user.password !== password) {
		throw InvalidEmailOrPassword;
	}

	return getAccessToken(user);
};

export const createUserWithEmailAndPassword = async (name: string, email: string, password: string) => {
	const id: UserID = v4();
	const user: User = { id, name, email, password, teams: [] };

	const existingUsers = await readDataWhere<User>(FirestoreCollections.USERS, "email", "==", email);

	// Email validation will be done at the client side only
	if (existingUsers.length !== 0) {
		throw EmailAlreadyExistError;
	}

	await addData<User>(FirestoreCollections.USERS, id, user);

	return getAccessToken(user);
};

export const getAccessToken = (user: User) => {
	const token: Token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "2h" });
	return { token, type: AccessTokenTypes.BEARER };
};
