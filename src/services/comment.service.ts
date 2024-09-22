import { API_ROUTES } from '@/configs/api-routes.config';
import { Comment, CommentCreate, CommentUpdate } from '@/types/comment.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const commentService = {
	async create(dto: CommentCreate): Promise<Comment> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.comments.create,
			data: dto,
		});
	},

	async findByTask(taskId: string, query?: string): Promise<Comment[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.comments.findByTask(taskId, query),
		});
	},

	async findByBoard(boardId: string, query?: string): Promise<Comment[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.comments.findByBoard(boardId, query),
		});
	},

	async update(commentId: string, dto: CommentUpdate): Promise<Comment> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.comments.update(commentId),
			data: dto,
		});
	},

	async delete(commentId: string): Promise<{ message: string }> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.comments.delete(commentId),
		});
	},
};
