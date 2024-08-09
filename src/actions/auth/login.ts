'use server';

import { signIn } from '@/auth';
import { LoginForm } from '@/interfaces/auth.interface';

export const login = async (data: LoginForm) => {
	try {
		await signIn('credentials', { ...data, redirect: false });
		return;
	} catch (error: any) {
		return { error: error.message };
	}
};
