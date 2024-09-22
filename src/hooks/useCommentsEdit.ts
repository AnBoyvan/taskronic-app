import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { commentService } from '@/services/comment.service';
import { CommentCreate, CommentUpdate } from '@/types/comment.interface';

export const useCommentsEdit = () => {
	const create = useMutation({
		mutationFn: (data: CommentCreate) => commentService.create(data),
		mutationKey: ['comment-create'],
		onSuccess: comment => {
			return comment;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const update = useMutation({
		mutationFn: ({ commentId, data }: { commentId: string; data: CommentUpdate }) =>
			commentService.update(commentId, data),
		mutationKey: ['comment-update'],
		onSuccess: comment => {
			return comment;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const remove = useMutation({
		mutationFn: (commentId: string) => commentService.delete(commentId),
		mutationKey: ['comment-delete'],
		onSuccess: ({ message }) => {
			toast.success(message, { closeButton: false });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { create, update, remove };
};
