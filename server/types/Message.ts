import { UserID } from "./User";

export default interface Message {
  sender: UserID;
  name: string;
  content: string;
}
