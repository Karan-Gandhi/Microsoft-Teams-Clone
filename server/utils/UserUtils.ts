import { addData, getSnapshotWhere, readData, readDataNoCache } from "../services/Firestore";
import { FeedType } from "../types/FeedItem";
import FirestoreCollections from "../types/FirestoreCollections";
import { TeamID } from "../types/Team";
import User, { UserID } from "../types/User";
import { addFeedItem } from "./TeamsUtils";

export const getUserByID = async (userID: UserID) => {
  const user = await readData<User>(FirestoreCollections.USERS, userID);
  if (!user.teams || !user.password) return await readDataNoCache<User>(FirestoreCollections.USERS, userID);
  return user;
};

export const updateUserData = async (userID: UserID, userData: User) => await addData(FirestoreCollections.USERS, userID, userData);

export const userJoinTeam = async (teamID: TeamID, userID: UserID) => {
  const user = await getUserByID(userID);
  await addFeedItem(teamID, { userJoined: (await getUserByID(userID)).name }, FeedType.UserJoin);
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
  users.forEach((doc) => {
    const user = doc.data() as User;
    delete user.password;
    delete user.teams;
    searchResults.push(user);
  });

  return searchResults.filter(({ email }) => email !== ignoreEmail).filter((_, idx) => idx <= searchSize - 1);
};

export const removeUserFromTeam = async (userID: UserID, teamID: TeamID) => {
  const user = await getUserByID(userID);
  if (user.teams?.findIndex((team) => team === teamID) === -1) return;
  user.teams?.splice(
    user.teams.findIndex((team) => team === teamID),
    1
  );
  return await updateUserData(userID, user);
};
