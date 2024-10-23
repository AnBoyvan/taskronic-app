import clsx from 'clsx';

import { PriorityLevel } from '@/configs/priority-config';
import { DueStatus } from '@/configs/task-due-statuses.config';
import { useTaskModal } from '@/hooks/useTaskModal';

type ScheduleEventCardProps = {
	id: string;
	title: string;
	status?: DueStatus;
	priority?: PriorityLevel;
};

export const ScheduleEventCard: React.FC<ScheduleEventCardProps> = ({
	id,
	status,
	title,
	priority,
}) => {
	const modal = useTaskModal();

	return (
		<div
			className={clsx(
				'flex flex-row items-center border-2 h-8 overflow-hidden rounded-md cursor-pointer hover:opacity-75 transition',
				`border-${status?.color}`,
			)}
			onClick={() => modal.onOpen(id)}
		>
			<div className={clsx('h-full w-2', `bg-${priority?.tw}`)} />
			<p className="text-xs p-1 truncate">{title}</p>
		</div>
	);
};
