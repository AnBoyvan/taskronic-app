import { API_ROUTES } from '@/configs/api-routes.config';
import { MemberDto } from '@/types/root.interface';
import { Subtask, Task, TaskCreate, TaskUpdGeneral, TaskUpdOrder } from '@/types/tasks.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const taskService = {
	async create(boardId: string, dto: TaskCreate): Promise<Task> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.tasks.create(boardId),
			data: dto,
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

	async updGeneral(taskId: string, dto: TaskUpdGeneral): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updGeneral(taskId),
			data: dto,
		});
	},

	async updOrder(boardId: string, dto: TaskUpdOrder[]): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updOrder(boardId),
			data: dto,
		});
	},

	async complete(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.complete(taskId),
		});
	},

	async archive(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.archive(taskId),
		});
	},

	async addMember(taskId: string, dto: MemberDto): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.addMember(taskId),
			data: dto,
		});
	},

	async removeMember(taskId: string, dto: MemberDto): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.removeMember(taskId),
			data: dto,
		});
	},

	async leave(taskId: string): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.leave(taskId),
		});
	},

	async addSubtask(taskId: string, dto: Subtask): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.addSubtask(taskId),
			data: dto,
		});
	},

	async updSubtask(taskId: string, dto: Subtask): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updSubtask(taskId),
			data: dto,
		});
	},

	async delSubtask(taskId: string, dto: Subtask): Promise<Task> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.delSubtask(taskId),
			data: dto,
		});
	},
};
