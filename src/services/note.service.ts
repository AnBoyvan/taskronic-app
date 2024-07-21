import { API_ROUTES } from '@/configs/apiRoutes.config';
import { INote, INoteCreate, INoteUpdate } from '@/interfaces/note.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const noteService = {
	async create(dto: INoteCreate): Promise<INote> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.notes.create,
			data: dto,
		});
	},

	async findById(noteId: string): Promise<INote> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.notes.findById(noteId),
		});
	},

	async findByOwner(): Promise<INote[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.notes.findByOwner,
		});
	},

	async update(noteId: string, dto: INoteUpdate): Promise<INote> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.notes.update(noteId),
			data: dto,
		});
	},

	async delete(noteId: string): Promise<{ message: string }> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.notes.delete(noteId),
		});
	},
};
