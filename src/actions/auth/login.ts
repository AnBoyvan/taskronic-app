'use server';

import { signIn } from '@/auth';
import { ILoginForm } from '@/interfaces/auth.interface';

export const login = async (data: ILoginForm) => {
	try {
		await signIn('credentials', { ...data, redirect: false });
		return;
	} catch (error: any) {
		return { error: error.message };
	}
};
