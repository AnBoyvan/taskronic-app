import { AuthError, NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';

import { ILoginForm } from '@/interfaces/auth.interface';
import { authService } from '@/services/auth.service';

class customError extends AuthError {
	constructor(message: string) {
		super();
		this.message = message;
	}
}

export default {
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
					const isILoginForm = (obj: any): obj is ILoginForm => {
						return obj && typeof obj.email === 'string' && typeof obj.password === 'string';
					};

					if (!isILoginForm(credentials)) {
						return null;
					}

					const data = await authService.login({
						...credentials,
					});

					if (data) {
						return data;
					}

					return null;
				} catch (error: any) {
					throw new customError(error.message);
				}
			},
		}),
	],
} satisfies NextAuthConfig;
