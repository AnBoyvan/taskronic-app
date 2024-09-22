import { useRouter } from 'next/navigation';

import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { ROUTES } from '@/configs/routes.config';
import { boardService } from '@/services/board.service';
import { MemberDto } from '@/types/root.interface';

type MemberServiceProps = {
	boardId: string;
	dto: MemberDto;
};

export const useBoardMembers = () => {
	const router = useRouter();

	const addMember = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.addMember(boardId, dto),
		mutationKey: ['boards-add-member'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeMember = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.removeMember(boardId, dto),
		mutationKey: ['boards-remove-member'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const addAdmin = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.addAdmin(boardId, dto),
		mutationKey: ['boards-add-admin'],
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeAdmin = useMutation({
		mutationFn: ({ boardId, dto }: MemberServiceProps) => boardService.removeAdmin(boardId, dto),
		mutationKey: ['boards-remove-admin'],
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
