import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { ROUTES } from '@/configs/routes.config';
import { WorkspaceCompose, WorkspaceSettings } from '@/interfaces/workspace.interface';
import { workspaceService } from '@/services/workspace.service';

export const useWorkspaceEdit = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { mutate: create } = useMutation({
		mutationFn: (dto: WorkspaceCompose) => workspaceService.create(dto),
		mutationKey: ['workspaces-create'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const { mutate: updGeneral } = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceCompose }) =>
			workspaceService.updGeneral(workspaceId, dto),
		mutationKey: ['workspaces-update-general'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const { mutate: updSettings } = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceSettings }) =>
			workspaceService.updSettings(workspaceId, dto),
		mutationKey: ['workspaces-settings'],

		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const { mutate: remove } = useMutation({
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
