'use client';

import { useTranslations } from 'next-intl';

import { ChangeEvent, useState } from 'react';

import { Select, SelectItem, SelectProps } from '@nextui-org/react';

import { priorityConfig } from '@/configs/priority-config';
import { Priority } from '@/types/root.interface';

interface PrioritySwitcherProps extends Partial<SelectProps> {
	current: Priority;
	onPriorityChange?: (priority: Priority) => void;
}

export const PrioritySwitcher: React.FC<PrioritySwitcherProps> = ({
	current,
	onPriorityChange,
	...props
}) => {
	const t = useTranslations();

	const [selected, setSelected] = useState<Priority>(current);

	const onPrioritySelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const newPriority = Number(e.target.value) as Priority;
		if (!Object.values(Priority).includes(newPriority) || newPriority === selected) {
			return;
		}
		setSelected(newPriority);
		if (onPriorityChange) {
			onPriorityChange(newPriority);
		}
	};

	return (
		<Select
			{...props}
			items={priorityConfig}
			aria-label={t('common.priority')}
			selectedKeys={[String(selected)]}
			disabledKeys={[String(selected)]}
			placeholder={t('placeholder.select')}
			onChange={onPrioritySelect}
			variant="flat"
			disallowEmptySelection
			renderValue={items => {
				return items.map(item => (
					<div
						key={String(item.data?.value)}
						title={t(item.data?.label)}
						className={`${item.data?.color} flex items-center h-full w-full px-2`}
					>
						{t(item.data?.label)}
					</div>
				));
			}}
			classNames={{
				trigger: 'p-0 overflow-hidden shadow-md',
				innerWrapper: 'w-full h-full',
				value: 'h-full ',
			}}
		>
			{({ value, label, color }) => (
				<SelectItem
					key={String(value)}
					value={String(value)}
					title={t(label)}
					className={`${color}`}
				/>
			)}
		</Select>
	);
};
