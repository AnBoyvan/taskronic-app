import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { inviteService } from '@/services/invite.service';
import { workspaceService } from '@/services/workspace.service';
import { MemberDto } from '@/types/root.interface';
import { WorkspaceInvite } from '@/types/workspace.interface';

import { useUser } from './useUser';

type MemberServiceProps = {
	workspaceId: string;
	dto: MemberDto;
};

export const useWorkspaceMembers = () => {
	const { updWorkspace, removeWorkspace } = useUser();
	const queryClient = useQueryClient();

	const invite = useMutation({
		mutationFn: ({ workspaceId, dto }: { workspaceId: string; dto: WorkspaceInvite[] }) =>
			workspaceService.invite(workspaceId, dto),
		mutationKey: ['workspaces-invite-add'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const acceptInvite = useMutation({
		mutationFn: ({ inviteId, workspaceId }: { inviteId: string; workspaceId: string }) =>
			inviteService.accept(inviteId, workspaceId),
		mutationKey: ['workspaces-invite-accept'],
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['invites'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const rejectInvite = useMutation({
		mutationFn: ({ inviteId, workspaceId }: { inviteId: string; workspaceId: string }) =>
			inviteService.reject(inviteId, workspaceId),
		mutationKey: ['workspaces-invite-reject'],
		onSuccess: () => {
			queryClient.refetchQueries({ queryKey: ['invites'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const addRequest = useMutation({
		mutationFn: (workspaceId: string) => workspaceService.addRequest(workspaceId),
		mutationKey: ['workspaces-request-add'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const acceptRequest = useMutation({
		mutationFn: ({ workspaceId, userId }: { workspaceId: string; userId: string }) =>
			workspaceService.acceptRequest(workspaceId, userId),
		mutationKey: ['workspaces-request-accept'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const declineRequest = useMutation({
		mutationFn: ({ workspaceId, userId }: { workspaceId: string; userId: string }) =>
			workspaceService.declineRequest(workspaceId, userId),
		mutationKey: ['workspaces-request-decline'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeMember = useMutation({
		mutationFn: ({ workspaceId, dto }: MemberServiceProps) =>
			workspaceService.removeMember(workspaceId, dto),
		mutationKey: ['workspaces-remove-member'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const addAdmin = useMutation({
		mutationFn: ({ workspaceId, dto }: MemberServiceProps) =>
			workspaceService.addAdmin(workspaceId, dto),
		mutationKey: ['workspaces-add-admin'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeAdmin = useMutation({
		mutationFn: ({ workspaceId, dto }: MemberServiceProps) =>
			workspaceService.removeAdmin(workspaceId, dto),
		mutationKey: ['workspaces-remove-admin'],
		onSuccess: workspace => {
			updWorkspace(workspace);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const leave = useMutation({
		mutationFn: (workspaceId: string) => workspaceService.leave(workspaceId),
		mutationKey: ['workspaces-leave'],
		onSuccess: workspace => {
			removeWorkspace(workspace._id);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return {
		invite,
		acceptInvite,
		rejectInvite,
		addRequest,
		acceptRequest,
		declineRequest,
		removeMember,
		addAdmin,
		removeAdmin,
		leave,
	};
};
