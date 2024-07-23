'use server';

import { errorCatch } from '@/utils/api/errorCatch';

export const testing = async (data?: any) => {
	const x = await errorCatch(data);
	return x;
};
