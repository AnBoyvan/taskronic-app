'use client';

import { useTranslations } from 'next-intl';

import { TaskMember } from '@/components/shared/TaskMember';
import { priorityColors } from '@/constants/priority-colors';
import { useTaskModal } from '@/hooks/useTaskModal';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { TaskDetails } from './TaskDetails';

interface TaskCardProps {
	task: Task;
	showInfo?: boolean;
	permissions?: BoardPermissions;
}

export const TaskCard = ({ task, permissions, showInfo }: TaskCardProps) => {
	const modal = useTaskModal();
	const t = useTranslations();

	const { _id, dueDate, description, subtasks, comments, members, archived } = task;

	if (archived) {
		return null;
	}

	const openTaskModal = () => {
		modal.onOpen(task._id);
	};
	const showTaskDetails = Boolean(
		dueDate || description || subtasks.length > 0 || (comments && comments?.length > 0),
	);

	const list = task.board.lists.find(list => list._id === task.list);

	return (
		<div
			role={'button'}
			className="flex flex-col bg-content1 p-0 gap-1 pb-1 hover:opacity-90 rounded-lg overflow-hidden shadow-md"
			onClick={openTaskModal}
		>
			<span
				className={`flex items-center px-2 pt-2 mb-1 min-h-5 ${priorityColors[task.priority]} text-sm text-pretty`}
			>
				{task.title}
			</span>
			{showInfo && (
				<div className="flex flex-col mb-1 gap-1 px-1 text-xs">
					{list && list?.label && (
						<span className="inline-flex flex-row break-words">
							<span>{t('task.in_list')}:&nbsp;</span>
							<span className="text-wrap break-words font-medium">{list.label}</span>
						</span>
					)}
					<div className="inline-flex flex-row break-words">
						<span className="lowercase">{t('common.board')}:&nbsp;</span>
						<span className="text-wrap break-words font-medium">{task.board.title}</span>
					</div>
					{task.workspace.name && (
						<span className="text-wrap break-words">
							<span className="lowercase">{t('common.workspace')}:&nbsp;</span>
							<span className="text-wrap break-words font-medium">{task.workspace.name}</span>
						</span>
					)}
				</div>
			)}
			{showTaskDetails && <TaskDetails task={task} permissions={permissions} />}
			{members && members.length > 0 && (
				<div className="px-2 mb-1 gap-1 flex w-full justify-end flex-wrap">
					{members.map(member => (
						<TaskMember
							key={member._id}
							member={member}
							taskId={_id}
							boardId={task.board._id}
							canRemove={permissions?.taskMembers}
							isSmall
						/>
					))}
				</div>
			)}
		</div>
	);
};
