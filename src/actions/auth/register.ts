'use server';

import { IRegisterForm } from '@/interfaces/auth.interface';
import { authService } from '@/services/auth.service';

import { login } from './login';

export const register = async (data: IRegisterForm, callbackUrl?: string | null) => {
	try {
		await authService.register(data);
		return login({ email: data.email, password: data.password }, callbackUrl);
	} catch (error: any) {
		return error.message;
	}
};
