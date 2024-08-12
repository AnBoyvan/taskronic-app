'use server';

import { authService } from '@/services/auth.service';
import { RegisterForm } from '@/types/auth.interface';

import { login } from './login';

export const register = async (data: RegisterForm) => {
	try {
		await authService.register(data);
		return login({ email: data.email, password: data.password });
	} catch (error: any) {
		return error.message;
	}
};
