import { TeamID } from "./Team";
export declare type UserID = string;
export default interface User {
    readonly id: UserID;
    name: string;
    email: string;
    readonly password: string;
    teams: TeamID[];
}
//# sourceMappingURL=User.d.ts.map