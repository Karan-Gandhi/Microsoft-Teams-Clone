export enum FeedType {
	Message,
	Meeting,
}

export default interface FeedItem<T> {
	type: FeedType;
	content: T;
	dateCreated: Date;
}
