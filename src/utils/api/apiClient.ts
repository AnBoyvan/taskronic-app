import axios, { type CreateAxiosDefaults } from 'axios';

import { ENV } from '@/configs/env.config';

const options: CreateAxiosDefaults = {
	baseURL: ENV.apiUrl,
	headers: {
		'Content-Type': 'application/json',
	},
};

const apiClient = axios.create(options);

apiClient.interceptors.request.use(async config => {
	const { auth } = await import('@/auth');
	const session = await auth();

	if (session) {
		config.headers.Authorization = `Bearer ${session.accessToken}`;
	}

	return config;
});

export { apiClient };
