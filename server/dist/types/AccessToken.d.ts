export declare type Token = string;
export declare enum AccessTokenTypes {
    BEARER = "Bearer"
}
export default interface AccessToken {
    type: AccessTokenTypes;
    token: Token;
}
