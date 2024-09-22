import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { taskService } from '@/services/task.service';
import { CreateSubtask, Subtask } from '@/types/tasks.interface';

type SubtaskServiceProps = {
	taskId: string;
	data: Subtask;
};

type CreateSubtaskProps = {
	taskId: string;
	data: CreateSubtask;
};

export const useSubtaskEdit = () => {
	const queryClient = useQueryClient();

	const addSubtask = useMutation({
		mutationFn: ({ taskId, data }: CreateSubtaskProps) => taskService.addSubtask(taskId, data),
		mutationKey: ['subtasks-create'],
		onSuccess: task => {
			return task;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updSubtask = useMutation({
		mutationFn: ({ taskId, data }: SubtaskServiceProps) => taskService.updSubtask(taskId, data),
		mutationKey: ['subtasks-update'],
		onSuccess: task => {
			return task;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const delSubtask = useMutation({
		mutationFn: ({ taskId, data }: SubtaskServiceProps) => taskService.delSubtask(taskId, data),
		mutationKey: ['subtasks-delete'],
		onSuccess: task => {
			return task;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { addSubtask, updSubtask, delSubtask };
};
