'use client';

import { Draggable } from '@hello-pangea/dnd';

import { TaskCard } from '@/components/shared/TaskCard';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

type DraggableTaskProps = {
	task: Task;
	index: number;
	permissions: BoardPermissions;
};

export const DraggableTask: React.FC<DraggableTaskProps> = ({ task, index, permissions }) => {
	return (
		<Draggable draggableId={task._id} index={index} isDragDisabled={!permissions.taskOrder}>
			{provided => (
				<div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
					<TaskCard task={task} permissions={permissions} />
				</div>
			)}
		</Draggable>
	);
};
