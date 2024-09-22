import { API_ROUTES } from '@/configs/api-routes.config';
import { Activity } from '@/types/activity.type';
import { apiRequest } from '@/utils/api/apiRequest';

export const activityService = {
	async findByBoard(boardId: string, query?: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByBoard(boardId, query),
		});
	},

	async findByBoardAndUser(boardId: string, query?: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByBoardAndUser(boardId, query),
		});
	},

	async findByTask(taskId: string, query?: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByTask(taskId, query),
		});
	},

	async findByUser(query?: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByUser(query),
		});
	},

	async findByEntity(entityId: string, query?: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByEntity(entityId, query),
		});
	},
};
