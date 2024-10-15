import { API_ROUTES } from '@/configs/api-routes.config';
import { Board } from '@/types/board.interface';
import { Member } from '@/types/root.interface';
import { IUser, UserUpd } from '@/types/user.interface';
import { Workspace } from '@/types/workspace.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const userService = {
	async getCurrent(): Promise<IUser> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.users.getCurrent,
		});
	},

	async updGeneral(dto: UserUpd): Promise<IUser> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.users.updGeneral,
			data: dto,
		});
	},

	async addContact(contactId: string): Promise<void> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.users.addContact(contactId),
		});
	},

	async findContacts(): Promise<Member[]> {
		const response = await apiRequest({
			method: 'GET',
			url: API_ROUTES.users.findContacts,
		});
		return response.contacts;
	},

	async removeContact(contactId: string): Promise<void> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.users.removeContact(contactId),
		});
	},

	async deleteCheck(): Promise<{ workspaces: Workspace[]; boards: Board[] }> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.users.deleteCheck,
		});
	},

	async deleteAccount(): Promise<void> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.users.deleteAccount,
		});
	},
};
