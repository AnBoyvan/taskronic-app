import { apiClient } from './apiClient';
import { errorCatch } from './errorCatch';

type RequestConfig = {
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	url: string;
	data?: any;
};

export const apiRequest = async (config: RequestConfig) => {
	try {
		const response = await apiClient(config);
		return response.data;
	} catch (error) {
		throw new Error(errorCatch(error));
	}
};
