import { IUser } from './user.interface';

export interface IRegisterForm {
	name: string;
	email: string;
	avatarColor?: string;
	password: string;
	confirmPassword: string;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface GoogleAuth {
	googleId: string;
	name: string;
	email: string;
}
export interface ITokens {
	accessToken: string;
	refreshToken: string;
}
export interface jwtPayload extends IUser {
	iat: number;
	exp: number;
}

export interface IAccessToken {
	header: {
		alg: string;
		typ: string;
	};
	payload: jwtPayload;
}

export interface IChangePassForm {
	password: string;
	newPassword: string;
	confirmNewPassword: string;
}

export interface IForgotPassRequest {
	email: string;
}

export interface IResetPassForm {
	token: string;
	password: string;
	confirmPassword: string;
}
