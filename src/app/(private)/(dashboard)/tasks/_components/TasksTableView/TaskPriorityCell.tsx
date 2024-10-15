import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Chip } from '@nextui-org/react';

import { priorityConfig } from '@/configs/priority-config';
import { Priority } from '@/types/root.interface';

type TaskPriorityCellProps = {
	priority: Priority;
};

export const TaskPriorityCell: React.FC<TaskPriorityCellProps> = ({ priority }) => {
	const t = useTranslations();

	const { label, color } =
		priorityConfig.find(({ value }) => value === priority) || priorityConfig[0];

	return (
		<>
			{priority !== Priority.NO && (
				<Chip variant="solid" size="sm" radius="sm" className={clsx('p-1', color)}>
					{t(label)}
				</Chip>
			)}
		</>
	);
};
