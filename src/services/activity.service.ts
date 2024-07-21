import { API_ROUTES } from '@/configs/apiRoutes.config';
import { IActivity } from '@/interfaces/activity.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const activityService = {
	async findByBoard(boardId: string): Promise<IActivity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByBoard(boardId),
		});
	},

	async findByUser(boardId: string): Promise<IActivity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByUser,
		});
	},

	async findByEntity(entityId: string): Promise<IActivity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.findByEntity(entityId),
		});
	},
};
