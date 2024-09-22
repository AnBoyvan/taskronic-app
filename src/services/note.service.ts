import { API_ROUTES } from '@/configs/api-routes.config';
import { Note, NoteCreate, NoteUpdate } from '@/types/note.interface';
import { apiRequest } from '@/utils/api/apiRequest';

export const noteService = {
	async create(dto: NoteCreate): Promise<Note> {
		return await apiRequest({
			method: 'POST',
			url: API_ROUTES.notes.create,
			data: dto,
		});
	},

	async findById(noteId: string): Promise<Note> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.notes.findById(noteId),
		});
	},

	async findByOwner(): Promise<Note[]> {
		return await apiRequest({
			method: 'GET',
			url: API_ROUTES.notes.findByOwner,
		});
	},

	async update(noteId: string, dto: NoteUpdate): Promise<Note> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.notes.update(noteId),
			data: dto,
		});
	},

	async resetDueDate(noteId: string): Promise<Note> {
		return await apiRequest({
			method: 'PATCH',
			url: API_ROUTES.notes.resetDueDate(noteId),
		});
	},

	async delete(noteId: string): Promise<{ message: string }> {
		return await apiRequest({
			method: 'DELETE',
			url: API_ROUTES.notes.delete(noteId),
		});
	},
};
