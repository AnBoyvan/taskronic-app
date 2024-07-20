'use server';

import { signIn } from '@/auth';
import { ILoginForm } from '@/interfaces/auth.interface';

export const login = async (data: ILoginForm) => {
	try {
		const result = await signIn('credentials', {
			...data,
			// redirect: false,
			redirectTo: '/calendar',
		});
	} catch (error: any) {
		if (error.type === 'AuthError') {
			return error.message;
		}

		throw error;
	}
};
