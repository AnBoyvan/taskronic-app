import NextAuth from 'next-auth';

import authConfig from '@/configs/auth.config';
import { authService } from '@/services/auth.service';
import { Token } from '@/types/auth.interface';
import { jwtDecode } from '@/utils/helpers/jwtDecode';

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	trustHost: true,
	session: { strategy: 'jwt' },
	callbacks: {
		async jwt({ token, user, trigger, session, account, profile }) {
			let data: Token | null = null;

			if (trigger === 'signIn' && account?.provider === 'google') {
				data = await authService.google({
					googleId: profile?.sub || '',
					name: profile?.name || token.name || 'User',
					email: profile?.email || token.email!,
				});
			}

			if (trigger === 'signIn' && account?.provider === 'credentials') {
				data = user;
			}

			if (trigger === 'update' && session.sub) {
				token.user = session;
			}

			if (data) {
				const decodedData = jwtDecode(data);
				token.user = decodedData.user;
				token.accessToken = decodedData.accessToken;
			}

			return token;
		},
		async session({ token }) {
			return {
				user: token.user,
				accessToken: token.accessToken,
			};
		},
	},
	pages: {
		signIn: '/auth',
		error: '/auth/error',
		signOut: '/auth',
	},
});
