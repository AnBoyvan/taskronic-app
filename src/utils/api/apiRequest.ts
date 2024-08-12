'use server';

import { revalidatePath } from 'next/cache';

import { Board } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { apiClient } from './apiClient';
import { apiErrorTranslate } from './apiErrorTranslate';

type RequestConfig = {
	method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
	url: string;
	data?: any;
	revalidate?: 'board' | 'task';
};

export const apiRequest = async ({ method, url, data, revalidate }: RequestConfig) => {
	try {
		const response = await apiClient({
			method,
			url,
			data: data ? data : {},
		});
		if (response && revalidate) {
			if (revalidate === 'board' && response.data.workspace) {
				console.log('REVALIDATE BY BOARD');
				const { workspace, _id } = response.data as Board;
				revalidatePath(`/w/${workspace}/${_id}`);
			}

			if (revalidate === 'task') {
				console.log('REVALIDATE BY TASK');
				const { workspace, board } = response.data as Task;
				revalidatePath(`/w/${workspace._id}/${board._id}`);
			}
		}

		return response.data;
	} catch (error) {
		const message = await apiErrorTranslate(error);
		throw new Error(message);
	}
};
