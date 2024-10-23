import { Section } from '@/components/layout/Section';
import { Schedule } from '@/components/shared/Schedule';
import { Board } from '@/types/board.interface';

type BoardScheduleProps = {
	board: Board;
};

export const BoardSchedule: React.FC<BoardScheduleProps> = ({ board }) => {
	const tasksWithDueDate = board.tasks.filter(task => Boolean(task.dueDate));

	return (
		<Section noTopMargin className="flex flex-col p-4 h-full bg-background overflow-auto">
			<Schedule tasks={tasksWithDueDate} />
		</Section>
	);
};
