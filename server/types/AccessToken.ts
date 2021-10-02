export type Token = string;

export enum AccessTokenTypes {
	BEARER = "Bearer",
}

export default interface AccessToken {
	type: AccessTokenTypes;
	token: Token;
}
