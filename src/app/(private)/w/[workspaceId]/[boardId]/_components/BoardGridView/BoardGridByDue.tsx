import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Divider } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { TaskCard } from '@/components/shared/TaskCard';
import { Icon } from '@/components/ui/Icon';
import { dueStatuses } from '@/configs/task-due-statuses.config';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { tasksByDueStatus } from '@/utils/helpers/tasksByDueStatus';

type BoardGridByDueProps = {
	tasks: Task[];
	permissions: BoardPermissions;
};

export const BoardGridByDue: React.FC<BoardGridByDueProps> = ({ tasks, permissions }) => {
	const t = useTranslations();

	const tasksByStatus = tasksByDueStatus(tasks);

	return (
		<>
			{dueStatuses.map(({ value, label, color, icon }) => (
				<Section key={value} noTopMargin className="flex flex-col gap-2 mt-2">
					<div
						className={clsx('flex flex-row items-center gap-4 p-2 h-14 rounded-lg', `bg-${color}`)}
					>
						<Icon name={icon} size={24} />
						<span>{t(label)}</span>
					</div>
					<div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
						{tasksByStatus[value].map(task => (
							<TaskCard key={task._id} task={task} permissions={permissions} />
						))}
					</div>
					<Divider className="my-4" />
				</Section>
			))}
		</>
	);
};
