import { Section } from '@/components/layout/Section';
import { Board } from '@/types/board.interface';

import { TasksPerDueDate } from './TasksPerDueDate';
import { TasksPerList } from './TasksPerList';
import { TasksPerMembers } from './TasksPerMembers';
import { TasksPerPriority } from './TasksPerPriority';

type BoardDashboardProps = {
	board: Board;
};

export const BoardDashboard: React.FC<BoardDashboardProps> = ({ board }) => {
	const { tasks, lists, members } = board;

	const activeTasks = tasks.filter(({ archived }) => !archived);
	const activeLists = lists.filter(({ archived }) => !archived);

	return (
		<Section noTopMargin className="flex flex-col p-4 h-full overflow-auto">
			<div className="gap-4 grid grid-cols-1 h-auto lg:grid-cols-2">
				<TasksPerList tasks={activeTasks} lists={activeLists} />
				<TasksPerDueDate tasks={activeTasks} />
				<TasksPerPriority tasks={activeTasks} />
				<TasksPerMembers tasks={activeTasks} members={members} />
			</div>
		</Section>
	);
};
