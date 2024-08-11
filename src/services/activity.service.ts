import { API_ROUTES } from '@/configs/api-routes.config';
import { Activity } from '@/interfaces/activity.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const activityService = {
	async findByBoard(boardId: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByBoard(boardId),
		});
	},

	async findByUser(boardId: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByUser,
		});
	},

	async findByEntity(entityId: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByEntity(entityId),
		});
	},
};
