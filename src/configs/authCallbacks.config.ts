import type { CallbacksOptions } from 'next-auth';

import { ITokens } from '@/interfaces/auth.interface';

export const authCallbacks: Partial<CallbacksOptions> = {
	async jwt({ token, user, trigger, session, account, profile }) {
		const data: ITokens | null = null;

		if (trigger === 'signIn' && account?.provider === 'google') {
			data = await authService.google({
				googleId: profile?.sub || '',
				name: profile?.name || token.name || 'User',
				email: profile?.email || token.email!,
			});
		}

		return token;
	},
};
