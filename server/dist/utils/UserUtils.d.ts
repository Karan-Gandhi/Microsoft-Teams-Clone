import { TeamID } from "../types/Team";
import User, { UserID } from "../types/User";
export declare const getUserByID: (userID: UserID) => Promise<User>;
export declare const updateUserData: (userID: UserID, userData: User) => Promise<FirebaseFirestore.WriteResult>;
export declare const userJoinTeam: (teamID: TeamID, userID: UserID) => Promise<FirebaseFirestore.WriteResult>;
export declare const getUserTeams: (userID: UserID) => Promise<string[]>;
//# sourceMappingURL=UserUtils.d.ts.map