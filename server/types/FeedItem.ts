export enum FeedType {
  Message,
  Meeting,
  UserJoin,
  UserLeave,
}

export default interface FeedItem<T> {
  type: FeedType;
  content: T;
  dateCreated: number;
}
