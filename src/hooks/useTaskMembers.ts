import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { taskService } from '@/services/task.service';
import { MemberDto } from '@/types/root.interface';

type MemberServiceProps = {
	taskId: string;
	data: MemberDto;
};

export const useTaskMembers = () => {
	const queryClient = useQueryClient();

	const addMember = useMutation({
		mutationFn: ({ taskId, data }: MemberServiceProps) => taskService.addMember(taskId, data),
		mutationKey: ['tasks-add-member'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const removeMember = useMutation({
		mutationFn: ({ taskId, data }: MemberServiceProps) => taskService.removeMember(taskId, data),
		mutationKey: ['tasks-remove-member'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const leave = useMutation({
		mutationFn: (taskId: string) => taskService.leave(taskId),
		mutationKey: ['tasks-leave'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { addMember, removeMember, leave };
};
