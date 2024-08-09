'use server';

import { ResetPassForm } from '@/interfaces/auth.interface';
import { authService } from '@/services/auth.service';

export const resetPassword = async (data: ResetPassForm) => {
	try {
		await authService.passReset(data);
	} catch (error: any) {
		return { error: error.message };
	}
};
