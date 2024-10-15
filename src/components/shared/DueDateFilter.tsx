'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Checkbox, CheckboxGroup, Chip } from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { dueStatuses } from '@/configs/task-due-statuses.config';
import { TasksFilter } from '@/utils/helpers/filterTasks';

type DueDateFilterProps = {
	value?: TasksFilter['dueDate'];
	setValue: (newValue: TasksFilter['dueDate']) => void;
};

export const DueDateFilter: React.FC<DueDateFilterProps> = ({ value, setValue }) => {
	const t = useTranslations();

	return (
		<CheckboxGroup
			label={t('task.due_date')}
			color="primary"
			value={value}
			onValueChange={val => setValue(val as TasksFilter['dueDate'])}
			size="md"
			classNames={{
				label: 'text-sm font-medium',
				wrapper: 'gap-0',
			}}
		>
			{dueStatuses.map(({ value, label, icon, color }) => (
				<Checkbox
					key={value}
					value={value.toString()}
					className="-my-0"
					classNames={{ label: 'flex items-center' }}
				>
					<Chip color={color} variant="solid" size="lg" radius="md" className="p-0">
						<Icon name={icon} size={16} />
					</Chip>
					<span className={clsx('p-2 rounded-lg text-sm', color)}>{t(label)}</span>
				</Checkbox>
			))}
		</CheckboxGroup>
	);
};
