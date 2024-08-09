import { IUser } from './user.interface';

export interface RegisterForm {
	name: string;
	email: string;
	avatarColor?: string;
	password: string;
	confirmPassword: string;
}

export interface LoginForm {
	email: string;
	password: string;
}

export interface GoogleAuth {
	googleId: string;
	name: string;
	email: string;
}
export interface Tokens {
	accessToken: string;
}
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

export interface ChangePassForm {
	password: string;
	newPassword: string;
	confirmNewPassword: string;
}

export interface ForgotPassRequest {
	email: string;
	lang: string;
}

export interface ResetPassForm {
	token: string;
	password: string;
	confirmPassword: string;
}
