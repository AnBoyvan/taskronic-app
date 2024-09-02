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
	revalidate?: 'board' | 'task' | 'workspace';
	workspaceId?: string;
};

export const apiRequest = async ({ method, url, data, revalidate, workspaceId }: RequestConfig) => {
	try {
		const response = await apiClient({
			method,
			url,
			data: data ? data : {},
		});
		if (response && revalidate) {
			if (revalidate === 'board' && response.data.workspace) {
				const { workspace, _id } = response.data as Board;
				revalidatePath(`/w/${workspace}/${_id}`);
			}

			if (revalidate === 'task') {
				const { workspace, board } = response.data as Task;
				revalidatePath(`/w/${workspace._id}/${board._id}`);
			}

			if (revalidate === 'workspace' && workspaceId) {
				revalidatePath(`/w/${workspaceId}`);
			}
		}

		return response.data;
	} catch (error) {
		const message = await apiErrorTranslate(error);
		throw new Error(message);
	}
};
