import NextAuth from 'next-auth';

import authConfig from '@/configs/auth.config';
import { ITokens } from '@/interfaces/auth.interface';
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
import { jwtDecode } from '@/utils/helpers/jwtDecode';

export const { handlers, signIn, signOut, auth } = NextAuth({
	...authConfig,
	session: { strategy: 'jwt' },
	callbacks: {
		async jwt({ token, user, trigger, session, account, profile }) {
			let data: ITokens | null = null;

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

			if (trigger === 'update' && session) {
				const updData = {
					name: session.name || token.user.name,
					avatarColor: session.avatarColor || token.user.avatarColor,
					noteGroups: session.noteGroups || token.user.noteGroups,
				};

				try {
					const updated = await userService.updGeneral(updData);
					token.user = updated;
				} catch (error) {}
			}

			if (Date.now() > token.access_exp * 1000) {
				try {
					data = await authService.refresh(token.refreshToken);
				} catch (error) {
					return null;
				}
			}

			if (data) {
				const decodedData = jwtDecode(data);
				token.user = decodedData.user;
				token.accessToken = decodedData.accessToken;
				token.access_exp = decodedData.access_exp;
				token.refreshToken = decodedData.refreshToken;
			}

			return token;
		},
		async session({ token }) {
			return {
				user: token.user,
				accessToken: token.accessToken,
				expires: new Date(token.exp * 1000).toISOString(),
			};
		},
	},
	pages: {
		signIn: '/auth',
		error: '/auth/error',
		signOut: '/',
	},
});
