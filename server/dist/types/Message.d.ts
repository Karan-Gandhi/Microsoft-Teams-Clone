import { UserID } from "./User";
export default interface Message {
    sender: UserID;
    content: string;
}
