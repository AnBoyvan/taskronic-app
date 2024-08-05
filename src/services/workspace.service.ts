import { API_ROUTES } from '@/configs/apiRoutes.config';
import { IMemberDto } from '@/interfaces/root.interface';
import {
	IWorkspace,
	IWorkspaceCompose,
	IWorkspaceInvite,
	IWorkspaceSettings,
} from '@/interfaces/workspace.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const workspaceService = {
	async create(dto: IWorkspaceCompose): Promise<IWorkspace> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.workspaces.create,
			data: dto,
		});
	},

	async findById(workspaceId: string): Promise<IWorkspace> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.workspaces.findById(workspaceId),
		});
	},

	async findAll(): Promise<IWorkspace[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.workspaces.findAll,
		});
	},

	async updGeneral(workspaceId: string, dto: IWorkspaceCompose): Promise<IWorkspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.updGeneral(workspaceId),
			data: dto,
		});
	},

	async updSettings(workspaceId: string, dto: IWorkspaceSettings): Promise<IWorkspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.updSettings(workspaceId),
			data: dto,
		});
	},

	async invite(workspaceId: string, dto: IWorkspaceInvite[]): Promise<IWorkspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.invite(workspaceId),
			data: {
				invites: dto,
			},
		});
	},

	async removeMember(workspaceId: string, dto: IMemberDto): Promise<IWorkspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.removeMember(workspaceId),
			data: dto,
		});
	},

	async addAdmin(workspaceId: string, dto: IMemberDto): Promise<IWorkspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.addAdmin(workspaceId),
			data: dto,
		});
	},

	async removeAdmin(workspaceId: string, dto: IMemberDto): Promise<IWorkspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.removeAdmin(workspaceId),
			data: dto,
		});
	},

	async delete(workspaceId: string): Promise<{ message: string }> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.workspaces.delete(workspaceId),
		});
	},
};
