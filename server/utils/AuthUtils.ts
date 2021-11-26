import * as jwt from "jsonwebtoken";
import { v4 } from "uuid";
import FirestoreCollections from "../types/FirestoreCollections";
import User, { UserID } from "../types/User";
import { addData, deleteData, readDataWhere } from "../services/Firestore";
import { AccessToken, AccessTokenTypes, RefreshToken, Token } from "../types/Tokens";
import { EmailAlreadyExistError, InvalidEmailOrPassword } from "./AuthErrors";

const ACCESS_TOKEN_EXPIRY_TIME = "10m";

export const loginWithEmailAndPassword = async (email: string, password: string) => {
  const existingUsers = await readDataWhere<User>(FirestoreCollections.USERS, "email", "==", email);
  if (existingUsers.length !== 1) {
    throw InvalidEmailOrPassword;
  }
  const user = existingUsers[0];

  if (user.password !== password) {
    throw InvalidEmailOrPassword;
  }

  return { ...getAccessToken(user), refreshToken: getRefreshToken(user) };
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

  return { ...getAccessToken(user), refreshToken: getRefreshToken(user) };
};

export const getAccessToken = (user: User): AccessToken => {
  const token: Token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: ACCESS_TOKEN_EXPIRY_TIME,
  });
  return { accessToken: token, type: AccessTokenTypes.BEARER };
};

export const getRefreshToken = (user: User): RefreshToken => {
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);
  addData(FirestoreCollections.REFRESH_TOKENS, refreshToken, {});
  return refreshToken;
};

export const revokeRefreshToken = (token: RefreshToken) => {
  deleteData(FirestoreCollections.REFRESH_TOKENS, token);
};

export const verifyAccessToken = (token: Token, callback: jwt.VerifyCallback) => {
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, callback);
};
