import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { workspaceService } from '@/services/workspace.service';
import { MemberDto } from '@/types/root.interface';
import { WorkspaceInvite } from '@/types/workspace.interface';

type MemberServiceProps = {
	workspaceId: string;
	dto: MemberDto;
};

export const useWorkspaceMembers = () => {
	const queryClient = useQueryClient();

	const { mutate: invite } = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceInvite[] }) =>
			workspaceService.invite(workspaceId, dto),
		mutationKey: ['workspaces-remove-member'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

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

	const { mutate: leave } = useMutation({
		mutationFn: (workspaceId: string) => workspaceService.leave(workspaceId),
		mutationKey: ['workspaces-leave'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { invite, removeMember, addAdmin, removeAdmin, leave };
};
