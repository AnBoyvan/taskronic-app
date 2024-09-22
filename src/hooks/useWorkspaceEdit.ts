import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { ROUTES } from '@/configs/routes.config';
import { workspaceService } from '@/services/workspace.service';
import { WorkspaceCompose, WorkspaceSettings } from '@/types/workspace.interface';

export const useWorkspaceEdit = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const create = useMutation({
		mutationFn: (dto: WorkspaceCompose) => workspaceService.create(dto),
		mutationKey: ['workspaces-create'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updGeneral = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceCompose }) =>
			workspaceService.updGeneral(workspaceId, dto),
		mutationKey: ['workspaces-update-general'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updSettings = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceSettings }) =>
			workspaceService.updSettings(workspaceId, dto),
		mutationKey: ['workspaces-settings'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const remove = useMutation({
		mutationFn: (workspaceId: string) => workspaceService.delete(workspaceId),
		mutationKey: ['workspaces-remove'],
		onSettled: () => {
			router.push(ROUTES.BOARDS);
		},
		onSuccess: ({ message }) => {
			toast.success(message, { closeButton: false });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { create, updGeneral, updSettings, remove };
};
