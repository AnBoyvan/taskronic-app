'use client';

import { Draggable } from '@hello-pangea/dnd';

import { TaskMember } from '@/components/shared/TaskMember';
import { priorityColors } from '@/constants/priority-colors';
import { BoardPermissions } from '@/types/board.interface';
import { TaskBoardField } from '@/types/tasks.interface';

import { TaskCardInfo } from './TaskCardInfo';

type TaskCardProps = {
	task: TaskBoardField;
	index: number;
	permissions: BoardPermissions;
	onTaskOpen: (taskId: string) => void;
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, index, permissions, onTaskOpen }) => {
	const { _id, dueDate, description, subtasks, comments, members, archived } = task;

	if (archived) {
		return null;
	}

	const openCard = () => {
		onTaskOpen(_id);
	};

	const showInfo = Boolean(
		dueDate || description || subtasks.length > 0 || (comments && comments?.length > 0),
	);

	return (
		<Draggable draggableId={_id} index={index} isDragDisabled={!permissions.taskOrder}>
			{provided => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role={'button'}
					className="flex flex-col bg-background mt-2 p-0 gap-1 pb-2 hover:opacity-90 rounded-lg overflow-hidden"
					onClick={openCard}
				>
					<div
						className={`flex items-center px-2 pt-2 w-full h-9 ${priorityColors[task.priority]} text-sm truncate`}
					>
						{task.title}
					</div>
					{showInfo && <TaskCardInfo task={task} canClose={permissions.closeTask} />}
					{members && members.length > 0 && (
						<div className="px-2 gap-1 flex w-full justify-end flex-wrap">
							{members.map(member => (
								<TaskMember
									key={member._id}
									member={member}
									taskId={_id}
									canRemove={permissions.taskMembers}
								/>
							))}
						</div>
					)}
				</div>
			)}
		</Draggable>
	);
};
