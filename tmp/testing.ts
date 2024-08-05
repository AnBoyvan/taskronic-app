'use server';

import { apiErrorTranslate } from '@/utils/api/apiErrorTranslate';

export const testing = async (data?: any) => {
	const x = await apiErrorTranslate(data);
	return x;
};
