import axios, { type CreateAxiosDefaults } from 'axios';

import { ITokens } from '@/interfaces/auth.interface';

import { errorCatch } from './errorCatch';

const options: CreateAxiosDefaults = {
	baseURL: process.env.API_URL,
};

type RequestConfig = {
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	url: string;
	token: string;
};

const apiRefreshClient = axios.create(options);

export const apiRequestWithRefresh = async (data: RequestConfig): Promise<ITokens> => {
	try {
		const response = await apiRefreshClient({
			method: data.method,
			url: data.url,
			headers: {
				Authorization: `Bearer ${data.token}`,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error(errorCatch(error));
	}
};
