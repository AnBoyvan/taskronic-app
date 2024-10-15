import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { boardService } from '@/services/board.service';
import { CreateListDto, List } from '@/types/board.interface';

export const useLists = () => {
	const queryClient = useQueryClient();

	const addList = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: CreateListDto }) =>
			boardService.addList(boardId, data),
		mutationKey: ['board-lists-create'],
		onSuccess: board => {
			return board;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updListsOrder = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: List[] }) =>
			boardService.listsOrder(boardId, data),
		mutationKey: ['boards-lists-order'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updList = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: List }) =>
			boardService.updList(boardId, data),
		mutationKey: ['boards-lists-update'],
		onSuccess: list => {
			return list;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const deleteList = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: List }) =>
			boardService.deleteList(boardId, data),
		mutationKey: ['boards-lists-delete'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { addList, updListsOrder, updList, deleteList };
};
