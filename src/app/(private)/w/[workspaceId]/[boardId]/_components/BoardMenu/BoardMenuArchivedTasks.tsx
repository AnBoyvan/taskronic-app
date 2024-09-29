'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Divider } from '@nextui-org/react';

import { RemoveTaskPopover } from '@/components/shared/RemoveTaskPopover';
import { useTaskModal } from '@/hooks/useTaskModal';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { Task } from '@/types/tasks.interface';

type BoardMenuArchivedTasksProps = {
	tasks: Task[];
	search: string;
	canRestoreTask: boolean;
	canDeleteTasks: boolean;
};

export const BoardMenuArchivedTasks: React.FC<BoardMenuArchivedTasksProps> = ({
	tasks,
	search,
	canDeleteTasks,
	canRestoreTask,
}) => {
	const t = useTranslations();
	const { archive, deleteTask } = useTasksEdit();
	const { onOpen } = useTaskModal();
	const [archivedTasks, setArchivedTasks] = useState<Task[]>(tasks);

	const restoreTask = (taskId: string) => {
		archive.mutate(taskId);
		setArchivedTasks(archivedTasks.filter(({ _id }) => _id !== taskId));
	};

	const removeTask = (task: Task) => {
		deleteTask.mutate({
			taskId: task._id,
			boardId: task.board._id,
			workspaceId: task.workspace._id,
		});
		setArchivedTasks(archivedTasks.filter(({ _id }) => _id !== task._id));
	};

	const filtered = archivedTasks.filter(({ title }) =>
		title.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<div className="flex flex-col overflow-y-auto">
			{filtered.map(task => (
				<div key={task._id} className="flex flex-col p-2">
					<button
						className="text-foreground hover:text-primary transition-colors text-start"
						onClick={() => onOpen(task._id)}
					>
						{task.title}
					</button>
					<div className="flex flex-row mt-1 gap-2">
						{canRestoreTask && (
							<button
								className="text-foreground hover:text-success transition-colors text-tiny"
								onClick={() => restoreTask(task._id)}
							>
								{t('common.restore')}
							</button>
						)}

						{canDeleteTasks && (
							<RemoveTaskPopover
								trigger={
									<button className="text-foreground hover:text-danger transition-colors text-tiny">
										{t('common.delete')}
									</button>
								}
								onRemove={() => removeTask(task)}
								canRemove={canDeleteTasks}
							/>
						)}
					</div>
					<Divider className="mt-2" />
				</div>
			))}
		</div>
	);
};
