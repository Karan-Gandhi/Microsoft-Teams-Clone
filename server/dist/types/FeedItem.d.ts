export declare enum FeedType {
    Message = 0,
    Meeting = 1
}
export default interface FeedItem<T> {
    type: FeedType;
    content: T;
    dateCreated: Date;
}
