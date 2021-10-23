import { TeamID } from "./Team";

export type UserID = string;

export default interface User {
  readonly id: UserID;
  name: string;
  email: string;
  password?: string;
  teams?: TeamID[];
}
