import { IUser } from './user.interface';

export type RegisterForm = {
	name: string;
	email: string;
	avatarColor?: string;
	password: string;
	confirmPassword: string;
};

export type LoginForm = {
	email: string;
	password: string;
};

export type GoogleAuth = {
	googleId: string;
	name: string;
	email: string;
};
export type Token = {
	accessToken: string;
};
export interface jwtPayload extends IUser {
	iat: number;
}

export interface AccessToken {
	header: {
		alg: string;
		typ: string;
	};
	payload: jwtPayload;
}

export type ChangePassForm = {
	password: string;
	newPassword: string;
	confirmNewPassword: string;
};

export type ForgotPassRequest = {
	email: string;
	lang: string;
};

export type ResetPassForm = {
	token: string;
	password: string;
	confirmPassword: string;
};
