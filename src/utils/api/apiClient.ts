import axios, { type CreateAxiosDefaults } from 'axios';

const options: CreateAxiosDefaults = {
	baseURL: process.env.API_URL,
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
