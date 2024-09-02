import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { ROUTES } from '@/configs/routes.config';
import { boardService } from '@/services/board.service';
import { BoardCompose, BoardOpen, BoardSettings } from '@/types/board.interface';

export const useBoardsEdit = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const create = useMutation({
		mutationFn: ({ workspaceId, data }: { workspaceId: string; data: BoardCompose }) =>
			boardService.create(workspaceId, data),
		mutationKey: ['boards-create'],
		onSuccess: board => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
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
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updSettings = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: BoardSettings }) =>
			boardService.updSettings(boardId, data),
		mutationKey: ['boards-update-settings'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const close = useMutation({
		mutationFn: (boardId: string) => boardService.close(boardId),
		mutationKey: ['boards-close'],
		onSuccess: ({ workspace }) => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
			router.push(`${ROUTES.WORKSPACE}/${workspace}`);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const open = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: BoardOpen }) =>
			boardService.open(boardId, data),
		mutationKey: ['boards-open'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
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
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const deleteBoard = useMutation({
		mutationFn: (boardId: string) => boardService.close(boardId),
		mutationKey: ['boards-close'],
		onSuccess: ({ workspace }) => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
			router.push(`${ROUTES.WORKSPACE}/${workspace}`);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { starred, create, updGeneral, updSettings, close, open };
};
