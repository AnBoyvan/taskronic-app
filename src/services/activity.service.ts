import { API_ROUTES } from '@/configs/api-routes.config';
import { Activity } from '@/types/activity.type';
import { apiRequest } from '@/utils/api/apiRequest';

export const activityService = {
	async find(query?: string): Promise<Activity[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.activity.find(query),
		});
	},
};
