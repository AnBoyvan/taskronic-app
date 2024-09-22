import { API_ROUTES } from '@/configs/api-routes.config';
import { MemberDto } from '@/types/root.interface';
import {
	CreateSubtask,
	Subtask,
	Task,
	TaskCreate,
	TaskUpdGeneral,
	TaskUpdOrder,
} from '@/types/tasks.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const taskService = {
	async create(boardId: string, data: TaskCreate): Promise<Task> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.tasks.create(boardId),
			data: data,
			revalidate: 'task',
		});
	},

	async findById(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.tasks.findById(taskId),
		});
	},

	async findByUser(): Promise<Task> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.tasks.findByUser,
		});
	},

	async updGeneral(taskId: string, data: TaskUpdGeneral): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updGeneral(taskId),
			data: data,
			revalidate: 'task',
		});
	},

	async updOrder(workspaceId: string, boardId: string, data: TaskUpdOrder[]): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updOrder(boardId),
			data: data,
			workspaceId,
			boardId,
			revalidate: 'board',
		});
	},

	async resetDueDate(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.resetDueDate(taskId),
			revalidate: 'task',
		});
	},

	async complete(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.complete(taskId),
			revalidate: 'task',
		});
	},

	async archive(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.archive(taskId),
			revalidate: 'task',
		});
	},

	async addMember(taskId: string, data: MemberDto): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.addMember(taskId),
			data: data,
			revalidate: 'task',
		});
	},

	async removeMember(taskId: string, data: MemberDto): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.removeMember(taskId),
			data: data,
			revalidate: 'task',
		});
	},

	async leave(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.leave(taskId),
			revalidate: 'task',
		});
	},

	async addSubtask(taskId: string, data: CreateSubtask): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.addSubtask(taskId),
			data: data,
			revalidate: 'task',
		});
	},

	async updSubtask(taskId: string, data: Subtask): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updSubtask(taskId),
			data: data,
			revalidate: 'task',
		});
	},

	async delSubtask(taskId: string, data: Subtask): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.delSubtask(taskId),
			data: data,
			revalidate: 'task',
		});
	},

	async deleteTask(
		taskId: string,
		boardId: string,
		workspaceId: string,
	): Promise<{ message: string }> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.tasks.delete(taskId),
			revalidate: 'board',
			workspaceId,
			boardId,
		});
	},
};
