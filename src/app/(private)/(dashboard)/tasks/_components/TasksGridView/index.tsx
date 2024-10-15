import { dueStatuses } from '@/configs/task-due-statuses.config';
import { Board } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { tasksByDueStatus } from '@/utils/helpers/tasksByDueStatus';

import { TasksGridViewByBoard } from './TasksGridViewByBoard';
import { TasksGridViewByDue } from './TasksGridViewByDue';

type TasksGridViewProps = {
	tasks: Task[];
	boards: Board[];
	sortBy: 'board' | 'due';
};

export const TasksGridView: React.FC<TasksGridViewProps> = ({ tasks, boards, sortBy }) => {
	const tasksByStatus = tasksByDueStatus(tasks);

	return (
		<div className="flex lg:hidden flex-col mt-4 gap-2 px-4">
			{sortBy === 'board' ? (
				<>
					{boards.map(board => (
						<TasksGridViewByBoard
							key={board._id}
							board={board}
							tasks={tasks.filter(task =>
								typeof task.board === 'string'
									? task.board === board._id
									: task.board._id === board._id,
							)}
						/>
					))}
				</>
			) : (
				<>
					{dueStatuses.map(status => (
						<TasksGridViewByDue
							key={status.value}
							status={status}
							tasks={tasksByStatus[status.value]}
						/>
					))}
				</>
			)}
		</div>
	);
};
