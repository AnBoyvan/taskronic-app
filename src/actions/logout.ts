'use server';

import { auth, signOut } from '@/auth';
import { authService } from '@/services/auth.service';

export const logout = async () => {
	const session = await auth();
	await signOut();
	try {
		if (session !== null && session.accessToken) {
			await authService.logout(session.accessToken);
		}
	} catch (error) {
		return;
	}
};
