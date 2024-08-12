'use server';

import { authService } from '@/services/auth.service';
import { ForgotPassRequest } from '@/types/auth.interface';

export const forgotPassword = async (data: ForgotPassRequest) => {
	try {
		await authService.passRequest(data);
	} catch (error: any) {
		return { error: error.message };
	}
};
