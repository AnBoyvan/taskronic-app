import { API_ROUTES } from '@/configs/api-routes.config';
import { Board, BoardCompose, BoardOpen, BoardSettings, List } from '@/interfaces/board.interface';
import { MemberDto } from '@/interfaces/root.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const boardService = {
	async create(workspaceId: string, dto: BoardCompose): Promise<Board> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.boards.create(workspaceId),
			data: dto,
		});
	},

	async findOne(boardId: string): Promise<Board> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.boards.findOne(boardId),
		});
	},

	async findByUser(): Promise<Board[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.boards.findByUser,
		});
	},

	async updGeneral(boardId: string, dto: BoardCompose): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.updGeneral(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async updSettings(boardId: string, dto: BoardSettings): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.updSettings(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async close(boardId: string): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.close(boardId),
			revalidate: 'board',
		});
	},

	async open(boardId: string, dto: BoardOpen): Promise<Board> {
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

	async addMember(boardId: string, dto: MemberDto): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.addMember(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async removeMember(boardId: string, dto: MemberDto): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.removeMember(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async addAdmin(boardId: string, dto: MemberDto): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.addAdmin(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async removeAdmin(boardId: string, dto: MemberDto): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.removeAdmin(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async leave(boardId: string): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.leave(boardId),
			revalidate: 'board',
		});
	},

	async addList(boardId: string, dto: List): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.addList(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async updList(boardId: string, dto: List): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.updList(boardId),
			data: dto,
			revalidate: 'board',
		});
	},

	async listsOrder(boardId: string, dto: List[]): Promise<Board> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.boards.listsOrder(boardId),
			data: dto,
			revalidate: 'board',
		});
	},
};
