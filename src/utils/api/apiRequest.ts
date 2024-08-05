'use server';

import { apiClient } from './apiClient';
import { apiErrorTranslate } from './apiErrorTranslate';

type RequestConfig = {
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	url: string;
	data?: any;
};

export const apiRequest = async ({ method, url, data }: RequestConfig) => {
	try {
		const response = await apiClient({
			method,
			url,
			data: data ? data : {},
		});
		return response.data;
	} catch (error) {
		const message = await apiErrorTranslate(error);
		throw new Error(message);
	}
};
