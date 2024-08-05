'use server';

import axios, { type CreateAxiosDefaults } from 'axios';

import { apiErrorTranslate } from './apiErrorTranslate';

const options: CreateAxiosDefaults = {
	baseURL: process.env.API_URL,
};

type RequestConfig = {
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	url: string;
	data?: any;
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
