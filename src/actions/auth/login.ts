'use server';

import { signIn } from '@/auth';
import { AUTH_REDIRECT } from '@/configs/routes.config';
import { ILoginForm } from '@/interfaces/auth.interface';

export const login = async (data: ILoginForm, callbackUrl?: string | null) => {
	try {
		await signIn('credentials', {
			...data,
			redirectTo: callbackUrl || AUTH_REDIRECT,
		});
	} catch (error: any) {
		return { error: error.message };
	}
};
