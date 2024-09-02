import { useRouter } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { ROUTES } from '@/configs/routes.config';
import { boardService } from '@/services/board.service';
import { MemberDto } from '@/types/root.interface';

type MemberServiceProps = {
	boardId: string;
	dto: MemberDto;
};

export const useBoardMembers = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const addMember = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.addMember(boardId, dto),
		mutationKey: ['boards-add-member'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeMember = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.removeMember(boardId, dto),
		mutationKey: ['boards-remove-member'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const addAdmin = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.addAdmin(boardId, dto),
		mutationKey: ['boards-add-admin'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeAdmin = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.removeAdmin(boardId, dto),
		mutationKey: ['boards-remove-admin'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const leave = useMutation({
		mutationFn: (boardId: string) => boardService.leave(boardId),
		mutationKey: ['boards-leave'],
		onSuccess: ({ workspace }) => {
			router.push(`${ROUTES.WORKSPACE}/${workspace}`);
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { addMember, removeMember, addAdmin, removeAdmin, leave };
};
