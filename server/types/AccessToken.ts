export type Token = string;

export enum AccessTokenTypes {
	BASIC = "Basic",
	BEARER = "Bearer",
}

export default interface AccessToken {
	type: AccessTokenTypes;
	accessToken: Token;
}
