export enum FeedType {
	Message,
	Meeting,
	UserJoin,
}

export default interface FeedItem<T> {
	type: FeedType;
	content: T;
	dateCreated: number;
}
