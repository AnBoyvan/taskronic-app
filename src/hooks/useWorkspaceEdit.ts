import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { messages } from '@/configs/messages.config';
import { ROUTES } from '@/configs/routes.config';
import { workspaceService } from '@/services/workspace.service';
import { WorkspaceCompose, WorkspaceSettings } from '@/types/workspace.interface';
import { getMessageKey } from '@/utils/locale/getMessageKey';

import { useUser } from './useUser';

export const useWorkspaceEdit = () => {
	const t = useTranslations();
	const { addWorkspace, updWorkspace, removeWorkspace } = useUser();
	const router = useRouter();

	const create = useMutation({
		mutationFn: (dto: WorkspaceCompose) => workspaceService.create(dto),
		mutationKey: ['workspaces-create'],
		onSuccess: workspace => {
			addWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updGeneral = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceCompose }) =>
			workspaceService.updGeneral(workspaceId, dto),
		mutationKey: ['workspaces-update-general'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updSettings = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceSettings }) =>
			workspaceService.updSettings(workspaceId, dto),
		mutationKey: ['workspaces-settings'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
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
		onSuccess: ({ message }, workspaceId) => {
			const key = getMessageKey(message, messages);
			toast.success(key ? t(key as any) : message, { closeButton: false });
			removeWorkspace(workspaceId);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { create, updGeneral, updSettings, remove };
};
