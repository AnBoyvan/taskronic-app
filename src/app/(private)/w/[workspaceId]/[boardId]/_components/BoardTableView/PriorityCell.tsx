'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { useState } from 'react';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { priorityConfig } from '@/configs/priority-config';
import { useTasksEdit } from '@/hooks/useTasksEdit';
import { Priority } from '@/types/root.interface';

type PriorityCellProps = {
	taskId: string;
	priority: Priority;
	canEdit?: boolean;
	textColor?: string;
};

export const PriorityCell: React.FC<PriorityCellProps> = ({
	taskId,
	priority,
	canEdit,
	textColor,
}) => {
	const t = useTranslations();
	const { updGeneral } = useTasksEdit();

	const [taskPriority, setTaskPriority] = useState<Priority>(priority);

	const { label, color } =
		priorityConfig.find(({ value }) => value === taskPriority) || priorityConfig[0];

	const changePriority = (newPriority: Priority) => {
		if (newPriority === taskPriority) {
			return;
		}
		updGeneral.mutate({
			taskId,
			data: {
				priority: newPriority,
			},
		});
		setTaskPriority(newPriority);
	};

	return (
		<Dropdown isDisabled={!canEdit} offset={0}>
			<DropdownTrigger>
				<Button
					variant="solid"
					size="sm"
					radius="sm"
					className={clsx(
						'p-1 min-w-7 h-6 justify-start',
						color,
						taskPriority === Priority.NO && textColor,
					)}
				>
					{taskPriority === Priority.NO ? '-' : t(label)}
				</Button>
			</DropdownTrigger>
			<DropdownMenu>
				{priorityConfig.map(({ value, label, color }) => (
					<DropdownItem
						key={value}
						isReadOnly={priority === value}
						className={clsx(color, priority === value && 'opacity-50')}
						endContent={priority === value ? <Icon name="Check" size={20} /> : null}
						onPress={() => changePriority(value)}
					>
						{t(label)}
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
