import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { taskService } from '@/services/task.service';
import { TaskCreate, TaskUpdGeneral, TaskUpdOrder } from '@/types/tasks.interface';

export const useTasksEdit = () => {
	const queryClient = useQueryClient();

	const create = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: TaskCreate }) =>
			taskService.create(boardId, data),
		mutationKey: ['tasks-create'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updGeneral = useMutation({
		mutationFn: ({ taskId, data }: { taskId: string; data: TaskUpdGeneral }) =>
			taskService.updGeneral(taskId, data),
		mutationKey: ['tasks-update-general'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updOrder = useMutation({
		mutationFn: ({
			workspaceId,
			boardId,
			data,
		}: {
			workspaceId: string;
			boardId: string;
			data: TaskUpdOrder[];
		}) => taskService.updOrder(workspaceId, boardId, data),
		mutationKey: ['tasks-update-order'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const complete = useMutation({
		mutationFn: (taskId: string) => taskService.complete(taskId),
		mutationKey: ['tasks-complete'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const archive = useMutation({
		mutationFn: (taskId: string) => taskService.archive(taskId),
		mutationKey: ['tasks-archive'],
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const deleteTask = useMutation({
		mutationFn: ({
			taskId,
			boardId,
			workspaceId,
		}: {
			taskId: string;
			boardId: string;
			workspaceId: string;
		}) => taskService.deleteTask(taskId, boardId, workspaceId),
		mutationKey: ['tasks-close'],
		onSuccess: ({ message }) => {
			queryClient.invalidateQueries({ queryKey: ['tasks', 'boards', 'workspaces'] });
			toast.success(message, { closeButton: false });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { create, updGeneral, updOrder, complete, archive, deleteTask };
};
