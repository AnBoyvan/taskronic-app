'use server';

import { authService } from '@/services/auth.service';
import { ResetPassForm } from '@/types/auth.interface';

export const resetPassword = async (data: ResetPassForm) => {
	try {
		await authService.passReset(data);
	} catch (error: any) {
		return { error: error.message };
	}
};
