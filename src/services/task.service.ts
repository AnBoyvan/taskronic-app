import { API_ROUTES } from '@/configs/apiRoutes.config';
import { IMemberDto } from '@/interfaces/root.interface';
import {
	ISubtask,
	ITask,
	ITaskCreate,
	ITaskUpdGeneral,
	ITaskUpdOrder,
} from '@/interfaces/tasks.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const taskService = {
	async create(boardId: string, dto: ITaskCreate): Promise<ITask> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.tasks.create(boardId),
			data: dto,
		});
	},

	async findById(taskId: string): Promise<ITask> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.tasks.findById(taskId),
		});
	},

	async findByUser(): Promise<ITask> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.tasks.findByUser,
		});
	},

	async updGeneral(taskId: string, dto: ITaskUpdGeneral): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updGeneral(taskId),
			data: dto,
		});
	},

	async updOrder(boardId: string, dto: ITaskUpdOrder[]): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updOrder(boardId),
			data: dto,
		});
	},

	async complete(taskId: string): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.complete(taskId),
		});
	},

	async archive(taskId: string): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.archive(taskId),
		});
	},

	async addMember(taskId: string, dto: IMemberDto): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.addMember(taskId),
			data: dto,
		});
	},

	async removeMember(taskId: string, dto: IMemberDto): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.removeMember(taskId),
			data: dto,
		});
	},

	async addSubtask(taskId: string, dto: ISubtask): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.addSubtask(taskId),
			data: dto,
		});
	},

	async updSubtask(taskId: string, dto: ISubtask): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.updSubtask(taskId),
			data: dto,
		});
	},

	async delSubtask(taskId: string, dto: ISubtask): Promise<ITask> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.tasks.delSubtask(taskId),
			data: dto,
		});
	},
};
