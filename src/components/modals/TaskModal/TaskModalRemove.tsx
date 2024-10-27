'use client';

import { useTranslations } from 'next-intl';

import { useEffect } from 'react';

import { Button } from '@nextui-org/react';

import { RemoveTaskPopover } from '@/components/shared/RemoveTaskPopover';
import { useTaskModal } from '@/hooks/useTaskModal';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { TaskModalSection } from './TaskModalSection';

type TaskModalRemoveProps = {
	task: Task;
	permissions?: BoardPermissions;
};

export const TaskModalRemove: React.FC<TaskModalRemoveProps> = ({ task, permissions }) => {
	const t = useTranslations();
	const { deleteTask } = useTasksEdit();
	const { onClose } = useTaskModal();

	const removeTask = () => {
		deleteTask.mutate({
			taskId: task._id,
			boardId: task.board._id,
			workspaceId: task.workspace._id,
		});
	};

	useEffect(() => {
		if (deleteTask.isSuccess) onClose();
	}, [deleteTask.isSuccess]);

	if (!permissions?.deleteTask) {
		return null;
	}

	return (
		<TaskModalSection>
			<RemoveTaskPopover
				trigger={
					<Button variant="light" color="danger" size="sm">
						{t('task.remove')}
					</Button>
				}
				canRemove={permissions.deleteTask}
				onRemove={removeTask}
			/>
		</TaskModalSection>
	);
};
