import { API_ROUTES } from '@/configs/apiRoutes.config';
import { IComment, ICommentCreate, ICommentUpdate } from '@/interfaces/comment.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const commentService = {
	async create(dto: ICommentCreate): Promise<IComment> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.comments.create,
			data: dto,
		});
	},

	async findByTask(taskId: string): Promise<IComment[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.comments.findByTask(taskId),
		});
	},

	async findByBoard(boardId: string): Promise<IComment[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.comments.findByBoard(boardId),
		});
	},

	async update(commentId: string, dto: ICommentUpdate): Promise<IComment> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.comments.update(commentId),
			data: dto,
		});
	},

	async delete(commentId: string, dto: ICommentUpdate): Promise<{ message: string }> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.comments.delete(commentId),
			data: dto,
		});
	},
};
