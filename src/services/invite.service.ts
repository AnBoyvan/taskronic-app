import { API_ROUTES } from '@/configs/apiRoutes.config';
import { apiRequest } from '@/utils/api/apiRequest';

export const inviteService = {
	async accept(inviteId: string): Promise<void> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.invites.accept(inviteId),
		});
	},

	async reject(inviteId: string): Promise<void> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.invites.reject(inviteId),
		});
	},

	async findByEmail(email: string): Promise<void> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.invites.findByEmail(email),
		});
	},

	async findById(inviteId: string): Promise<void> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.invites.findById(inviteId),
		});
	},
};
