'use server';

import axios, { type CreateAxiosDefaults } from 'axios';

import { ENV } from '@/configs/env.config';

import { apiErrorTranslate } from './apiErrorTranslate';

type RequestConfig = {
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	url: string;
	data?: any;
};

const options: CreateAxiosDefaults = {
	baseURL: ENV.apiUrl,
};

const apiClientAuth = axios.create(options);

export const apiRequestAuth = async (data: RequestConfig) => {
	try {
		const response = await apiClientAuth({
			method: data.method,
			url: data.url,
			data: data.data,
		});

		return response.data;
	} catch (error) {
		const message = await apiErrorTranslate(error);
		throw new Error(message);
	}
};
