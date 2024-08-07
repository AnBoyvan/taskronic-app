import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { IMemberDto } from '@/interfaces/root.interface';
import { workspaceService } from '@/services/workspace.service';

type MemberServiceProps = {
	workspaceId: string;
	dto: IMemberDto;
};

export const useWorkspaces = () => {
	const queryClient = useQueryClient();

	const { mutate: removeMember } = useMutation({
		mutationFn: ({ workspaceId, dto }: MemberServiceProps) =>
			workspaceService.removeMember(workspaceId, dto),
		mutationKey: ['workspaces-remove-member'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const { mutate: addAdmin } = useMutation({
		mutationFn: ({ workspaceId, dto }: MemberServiceProps) =>
			workspaceService.addAdmin(workspaceId, dto),
		mutationKey: ['workspaces-add-admin'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const { mutate: removeAdmin } = useMutation({
		mutationFn: ({ workspaceId, dto }: MemberServiceProps) =>
			workspaceService.removeAdmin(workspaceId, dto),
		mutationKey: ['workspaces-remove-admin'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { removeMember, addAdmin, removeAdmin };
};
