export declare type Token = string;
export declare enum AccessTokenTypes {
    BASIC = "Basic",
    BEARER = "Bearer"
}
export interface AccessToken {
    type: AccessTokenTypes;
    accessToken: Token;
}
export declare type RefreshToken = string;
//# sourceMappingURL=Tokens.d.ts.map