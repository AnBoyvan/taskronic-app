import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { ROUTES } from '@/configs/routes.config';
import { boardService } from '@/services/board.service';
import { BoardCompose, BoardOpen, BoardSettings } from '@/types/board.interface';

export const useBoardsEdit = () => {
	const router = useRouter();

	const create = useMutation({
		mutationFn: ({ workspaceId, data }: { workspaceId: string; data: BoardCompose }) =>
			boardService.create(workspaceId, data),
		mutationKey: ['boards-create'],
		onSuccess: board => {
			return board;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updGeneral = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: BoardCompose }) =>
			boardService.updGeneral(boardId, data),
		mutationKey: ['boards-update-general'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updSettings = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: BoardSettings }) =>
			boardService.updSettings(boardId, data),
		mutationKey: ['boards-update-settings'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const close = useMutation({
		mutationFn: (boardId: string) => boardService.close(boardId),
		mutationKey: ['boards-close'],
		onSuccess: ({ workspace }) => {
			router.push(`${ROUTES.WORKSPACE}/${workspace?._id}`);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const open = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: BoardOpen }) =>
			boardService.open(boardId, data),
		mutationKey: ['boards-open'],
		onSuccess: board => {
			return board;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const starred = useMutation({
		mutationFn: (boardId: string) => boardService.starred(boardId),
		mutationKey: ['boards-starred'],
		onSuccess: ({ message }) => {
			toast.success(message, { closeButton: false });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const deleteBoard = useMutation({
		mutationFn: (boardId: string) => boardService.deleteBoard(boardId),
		mutationKey: ['boards-delete'],
		onSuccess: ({ message }) => {
			toast.success(message, { closeButton: false });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { starred, create, updGeneral, updSettings, close, open, deleteBoard };
};
