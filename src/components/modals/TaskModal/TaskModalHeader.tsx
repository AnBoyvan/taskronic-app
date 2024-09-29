'use client';

import { useTranslations } from 'next-intl';

import { useState } from 'react';

import { Icon } from '@/components/ui/Icon';
import { useReorder } from '@/hooks/useReorder';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { ArchiveTaskPopover } from './ArchiveTaskPopover';
import { TaskMovePopover } from './MoveTaskPopover';
import { TaskModalSection } from './TaskModalSection';
import { TaskModalTitle } from './TaskModalTitle';

type TaskModalHeaderProps = {
	task: Task;
	permissions?: BoardPermissions;
};

export const TaskModalHeader: React.FC<TaskModalHeaderProps> = ({ task, permissions }) => {
	const t = useTranslations();
	const { tasksReorder } = useReorder(task.board);
	const { archive } = useTasksEdit();

	const [isArchived, setIsArchived] = useState<boolean>(task.archived);
	const [currentPosition, setCurrentPosition] = useState<{ listId: string; position: number }>({
		listId: task.list,
		position: task.order,
	});

	const currentList = task.board.lists.find(list => list._id === currentPosition.listId);

	if (!currentList) {
		return null;
	}

	const handleTaskMove = (listId: string, index: number) => {
		tasksReorder(task.list, task.order, listId, index);
		setCurrentPosition({ listId, position: index });
	};

	const taskArchivedToggle = async () => {
		if (archive.isPending) {
			return;
		}

		const updated = await archive.mutateAsync(task._id);

		setIsArchived(true);
	};

	return (
		<TaskModalSection icon="IdCard" iconWrapper="pt-2">
			<div className="flex flex-col">
				<TaskModalTitle title={task.title} taskId={task._id} canEdit={permissions?.createTask} />
				<div className="flex flex-row items-center text-tiny h-7">
					<span>{t('task.in_list')}&nbsp;</span>
					{permissions?.taskOrder ? (
						<TaskMovePopover
							trigger={
								<button className="p-0 min-w-0 min-h-0 text-foreground underline hover:opacity-90">
									{currentList.label}
								</button>
							}
							currentList={currentList}
							currentIndex={currentPosition.position}
							lists={task.board.lists}
							onMoveSelect={handleTaskMove}
							boardTasks={task.board.tasks}
						/>
					) : (
						<span className="underline">{currentList.label}</span>
					)}
				</div>
				<ArchiveTaskPopover
					trigger={
						<button
							disabled={archive.isPending}
							className="flex flex-row items-center w-fit gap-1 p-0 text-foreground hover:opacity-90 text-tiny h-7"
						>
							<span>{t(isArchived ? 'task.restore' : 'task.archive')}</span>
							<Icon name={isArchived ? 'ArchiveRestore' : 'Archive'} size={12} />
						</button>
					}
					isArchived={isArchived}
					onArchive={taskArchivedToggle}
					canArchive={permissions?.archiveTask}
				/>
			</div>
		</TaskModalSection>
	);
};
