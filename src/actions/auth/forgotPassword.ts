'use server';

import { IForgotPassRequest } from '@/interfaces/auth.interface';
import { authService } from '@/services/auth.service';

export const forgotPassword = async (data: IForgotPassRequest) => {
	try {
		await authService.passRequest(data);
	} catch (error: any) {
		return { error: error.message };
	}
};
