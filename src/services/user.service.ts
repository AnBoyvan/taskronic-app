import { API_ROUTES } from '@/configs/api-routes.config';
import { Member } from '@/interfaces/root.interface';
import { IUser, UserUpd } from '@/interfaces/user.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const userService = {
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

	async deleteAccount(): Promise<void> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.users.deleteAccount,
		});
	},
};
