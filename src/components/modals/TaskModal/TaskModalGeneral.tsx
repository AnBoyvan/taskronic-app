'use client';

import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { TaskModalDueDate } from './TaskModalDueDate';
import { TaskModalMembers } from './TaskModalMembers';
import { TaskModalPriority } from './TaskModalPriority';
import { TaskModalSection } from './TaskModalSection';

type TaskModalGeneralProps = {
	task: Task;
	permissions?: BoardPermissions;
};

export const TaskModalGeneral: React.FC<TaskModalGeneralProps> = ({ task, permissions }) => {
	return (
		<TaskModalSection>
			<div className="flex flex-col gap-y-3">
				<TaskModalMembers
					members={task.members}
					taskId={task._id}
					boardId={task.board._id}
					canRemove={permissions?.taskMembers}
					boardMembers={task.board.members}
				/>
				<div className="flex flex-row flex-wrap gap-y-3 gap-x-4">
					<TaskModalPriority
						taskId={task._id}
						priority={task.priority}
						canEdit={permissions?.createTask}
					/>
					<TaskModalDueDate
						taskId={task._id}
						completed={task.completed}
						dueDate={task.dueDate}
						canClose={permissions?.closeTask}
						canEdit={permissions?.createTask}
					/>
				</div>
			</div>
		</TaskModalSection>
	);
};
