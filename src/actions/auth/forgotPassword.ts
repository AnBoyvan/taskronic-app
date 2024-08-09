'use server';

import { ForgotPassRequest } from '@/interfaces/auth.interface';
import { authService } from '@/services/auth.service';

export const forgotPassword = async (data: ForgotPassRequest) => {
	try {
		await authService.passRequest(data);
	} catch (error: any) {
		return { error: error.message };
	}
};
