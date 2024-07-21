import { API_ROUTES } from '@/configs/apiRoutes.config';
import {
	IBoard,
	IBoardCompose,
	IBoardOpen,
	IBoardSettings,
	IList,
} from '@/interfaces/board.interface';
import { IMemberDto } from '@/interfaces/root.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const boardService = {
	async create(workspaceId: string, dto: IBoardCompose): Promise<IBoard> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.boards.create(workspaceId),
			data: dto,
		});
	},

	async findOne(boardId: string): Promise<IBoard> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.boards.findOne(boardId),
		});
	},

	async findByUser(): Promise<IBoard[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.boards.findByUser,
		});
	},

	async updGeneral(boardId: string, dto: IBoardCompose): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.updGeneral(boardId),
			data: dto,
		});
	},

	async updSettings(boardId: string, dto: IBoardSettings): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.updSettings(boardId),
			data: dto,
		});
	},

	async close(boardId: string): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.close(boardId),
		});
	},

	async open(boardId: string, dto: IBoardOpen): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.open(boardId),
			data: dto,
		});
	},

	async starred(boardId: string): Promise<{ message: string }> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.starred(boardId),
		});
	},

	async addMember(boardId: string, dto: IMemberDto): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.addMember(boardId),
			data: dto,
		});
	},

	async removeMember(boardId: string, dto: IMemberDto): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.removeMember(boardId),
			data: dto,
		});
	},

	async addAdmin(boardId: string, dto: IMemberDto): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.addAdmin(boardId),
			data: dto,
		});
	},

	async removeAdmin(boardId: string, dto: IMemberDto): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.removeAdmin(boardId),
			data: dto,
		});
	},

	async addList(boardId: string, dto: IList): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.addList(boardId),
			data: dto,
		});
	},

	async updList(boardId: string, dto: IList): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.updList(boardId),
			data: dto,
		});
	},

	async listsOrder(boardId: string, dto: IList[]): Promise<IBoard> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.listsOrder(boardId),
			data: dto,
		});
	},
};
