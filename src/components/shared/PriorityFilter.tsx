'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Checkbox, CheckboxGroup } from '@nextui-org/react';

import { priorityConfig } from '@/configs/priority-config';
import { Priority } from '@/types/root.interface';
import { TasksFilter } from '@/utils/helpers/filterTasks';

type PriorityFilterProps = {
	value?: TasksFilter['priority'];
	setValue: (newValue: TasksFilter['priority']) => void;
};

export const PriorityFilter: React.FC<PriorityFilterProps> = ({ value, setValue }) => {
	const t = useTranslations();

	const stringValue = value?.map(v => v.toString());

	const handleChange = (newValue: string[]) => {
		const priorityValues = newValue.map(v => parseInt(v) as Priority);
		setValue(priorityValues);
	};

	return (
		<CheckboxGroup
			label={t('common.priority')}
			color="primary"
			value={stringValue}
			onValueChange={handleChange}
			size="md"
			classNames={{
				label: 'text-sm font-medium',
				wrapper: 'gap-1',
			}}
		>
			{priorityConfig.map(({ value, label, color }) => (
				<Checkbox key={value} value={value.toString()} className="-my-0">
					<span className={clsx('p-2 rounded-lg text-sm', color)}>{t(label)}</span>
				</Checkbox>
			))}
		</CheckboxGroup>
	);
};
