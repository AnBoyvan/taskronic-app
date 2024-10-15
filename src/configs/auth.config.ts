import { AuthError, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { authService } from '@/services/auth.service';
import { LoginForm } from '@/types/auth.interface';

import { ENV } from './env.config';

class customError extends AuthError {
	constructor(message: string) {
		super();
		this.message = message;
	}
}

export default {
	providers: [
		Google({
			clientId: ENV.googleClientId,
			clientSecret: ENV.googleClientSecret,
		}),
		Credentials({
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					required: true,
				},
				password: {
					label: 'Password',
					type: 'password',
					required: true,
				},
			},
			async authorize(credentials) {
				try {
					const isILoginForm = (obj: any): obj is LoginForm => {
						return obj && typeof obj.email === 'string' && typeof obj.password === 'string';
					};

					if (!isILoginForm(credentials)) {
						return null;
					}

					const accessToken = await authService.login({
						...credentials,
					});

					if (accessToken) {
						return { accessToken };
					}

					return null;
				} catch (error: any) {
					throw new customError(error.message);
				}
			},
		}),
	],
} satisfies NextAuthConfig;
