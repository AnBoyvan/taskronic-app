import { API_ROUTES } from '@/configs/api-routes.config';
import { MemberDto } from '@/types/root.interface';
import {
	Workspace,
	WorkspaceCompose,
	WorkspaceInvite,
	WorkspaceSettings,
} from '@/types/workspace.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const workspaceService = {
	async create(dto: WorkspaceCompose): Promise<Workspace> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.workspaces.create,
			data: dto,
		});
	},

	async findById(workspaceId: string): Promise<Workspace> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.workspaces.findById(workspaceId),
		});
	},

	async findAll(): Promise<Workspace[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.workspaces.findAll,
		});
	},

	async updGeneral(workspaceId: string, dto: WorkspaceCompose): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.updGeneral(workspaceId),
			data: dto,
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async updSettings(workspaceId: string, dto: WorkspaceSettings): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.updSettings(workspaceId),
			data: dto,
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async invite(workspaceId: string, dto: WorkspaceInvite[]): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.invite(workspaceId),
			data: {
				invites: dto,
			},
		});
	},

	async addRequest(workspaceId: string): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.addRequest(workspaceId),
		});
	},

	async acceptRequest(workspaceId: string, userId: string): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.acceptRequest(workspaceId),
			data: {
				userId,
			},
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async declineRequest(workspaceId: string, userId: string): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.declineRequest(workspaceId),
			data: {
				userId,
			},
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async removeMember(workspaceId: string, dto: MemberDto): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.removeMember(workspaceId),
			data: dto,
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async addAdmin(workspaceId: string, dto: MemberDto): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.addAdmin(workspaceId),
			data: dto,
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async removeAdmin(workspaceId: string, dto: MemberDto): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.removeAdmin(workspaceId),
			data: dto,
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async leave(workspaceId: string): Promise<Workspace> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.workspaces.leave(workspaceId),
			revalidate: 'workspace',
			workspaceId,
		});
	},

	async delete(workspaceId: string): Promise<{ message: string }> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.workspaces.delete(workspaceId),
		});
	},
};
