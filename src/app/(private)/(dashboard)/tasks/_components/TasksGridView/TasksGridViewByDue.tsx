import { useTranslations } from 'next-intl';

import { Chip } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { TaskCard } from '@/components/shared/TaskCard';
import { Icon } from '@/components/ui/Icon';
import { DueStatus } from '@/configs/task-due-statuses.config';
import { useUser } from '@/hooks/useUser';
import { Task } from '@/types/tasks.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

type TasksGridViewByDueProps = {
	tasks: Task[];
	status: DueStatus;
	showInfo?: boolean;
};

export const TasksGridViewByDue: React.FC<TasksGridViewByDueProps> = ({
	tasks,
	status,
	showInfo,
}) => {
	const t = useTranslations();
	const user = useUser();

	const { color, icon, label } = status;

	if (tasks.length < 1) {
		return null;
	}

	return (
		<Section className="flex flex-col gap-2">
			<div className="flex flex-row items-center gap-2">
				<Chip color={color} variant="solid" size="lg" radius="md" className="p-0">
					<Icon name={icon} size={20} />
				</Chip>
				<span>{t(label)}</span>
			</div>
			<div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
				{tasks.map(task => (
					<TaskCard
						key={task._id}
						task={task}
						showInfo={showInfo}
						permissions={getBoardPermissions(task.board, user._id)}
					/>
				))}
			</div>
		</Section>
	);
};
