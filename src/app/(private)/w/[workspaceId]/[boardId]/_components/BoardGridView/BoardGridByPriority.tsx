import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Divider } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { TaskCard } from '@/components/shared/TaskCard';
import { priorityConfig } from '@/configs/priority-config';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { sorter } from '@/utils/helpers/sorter';
import { tasksByDueStatus } from '@/utils/helpers/tasksByDueStatus';

type BoardGridByPriorityProps = {
	tasks: Task[];
	permissions: BoardPermissions;
};

export const BoardGridByPriority: React.FC<BoardGridByPriorityProps> = ({ tasks, permissions }) => {
	const t = useTranslations();

	const tasksByStatus = tasksByDueStatus(tasks);

	const priorities = sorter(priorityConfig, 'value', 'desc');

	return (
		<>
			{priorities.map(({ value, label, color }) => (
				<Section key={value} noTopMargin className="flex flex-col gap-2 mt-2">
					<div className={clsx('flex flex-row items-center gap-4 p-2 h-14 rounded-lg', color)}>
						{t(label)}
					</div>
					<div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
						{tasks
							.filter(task => task.priority === value)
							.map(task => (
								<TaskCard key={task._id} task={task} permissions={permissions} />
							))}
					</div>
					<Divider className="my-4" />
				</Section>
			))}
		</>
	);
};
