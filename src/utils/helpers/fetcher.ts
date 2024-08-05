import { cache } from 'react';

export interface FetcherResponse<T> {
	data?: T;
	error?: string;
}

export const fetcher = cache(async <T>(service: Promise<T>): Promise<FetcherResponse<T>> => {
	try {
		const data = await service;
		return { data };
	} catch (error: any) {
		return { error: error.message };
	}
});
