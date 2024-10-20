import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { toast } from 'sonner';

import { taskService } from '@/services/task.service';
import { TaskCreate, TaskUpdGeneral, TaskUpdOrder } from '@/types/tasks.interface';
import { getMessageKey } from '@/utils/locale/getMessageKey';

import en from '../../messages/en.json';

export const useTasksEdit = () => {
	const t = useTranslations();

	const create = useMutation({
		mutationFn: ({ boardId, data }: { boardId: string; data: TaskCreate }) =>
			taskService.create(boardId, data),
		mutationKey: ['tasks-create'],

		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const updGeneral = useMutation({
		mutationFn: ({ taskId, data }: { taskId: string; data: TaskUpdGeneral }) =>
			taskService.updGeneral(taskId, data),
		mutationKey: ['tasks-update-general'],
		onSuccess: task => {
			return task;
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
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const resetDueDate = useMutation({
		mutationFn: (taskId: string) => taskService.resetDueDate(taskId),
		mutationKey: ['tasks-reset'],
		onSuccess: task => {
			return task;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const complete = useMutation({
		mutationFn: (taskId: string) => taskService.complete(taskId),
		mutationKey: ['tasks-complete'],
		onSuccess: task => {
			return task;
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	const archive = useMutation({
		mutationFn: (taskId: string) => taskService.archive(taskId),
		mutationKey: ['tasks-archive'],
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
		mutationKey: ['tasks-delete'],
		onSuccess: ({ message }) => {
			const key = getMessageKey(message, en);
			toast.success(key ? t(key as any) : message, { closeButton: false });
		},
		onError: err => {
			toast.error(err.message, { closeButton: false });
		},
	});

	return { create, updGeneral, updOrder, resetDueDate, complete, archive, deleteTask };
};
