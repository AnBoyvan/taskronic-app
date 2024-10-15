'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';

import { Chip, Select, SelectedItems, SelectItem, SharedSelection } from '@nextui-org/react';

import { boardColors } from '@/constants/board-colors.constants';
import { Board } from '@/types/board.interface';
import { TasksFilter } from '@/utils/helpers/filterTasks';

type BoardsFilterProps = {
	value?: TasksFilter['boards'];
	setValue: (newValue: TasksFilter['boards']) => void;
	boards: Board[];
};

export const BoardsFilter: React.FC<BoardsFilterProps> = ({ value, setValue, boards }) => {
	const t = useTranslations();

	const stringValue = value?.map(v => v.toString());

	const handleChange = (keys: SharedSelection) => {
		const selected = Array.from(keys).map(key => key.toString());
		setValue(selected);
	};

	return (
		<div className="flex flex-col w-full gap-4">
			<span className="text-sm font-medium text-foreground-500">{t('common.boards')}</span>
			<Select
				items={boards}
				selectedKeys={value}
				aria-label={t('common.boards')}
				placeholder={t('placeholder.select')}
				value={stringValue}
				isMultiline={true}
				selectionMode="multiple"
				variant="bordered"
				size="lg"
				onSelectionChange={handleChange}
				renderValue={(items: SelectedItems<Board>) => {
					return (
						<div className="flex flex-wrap gap-2 max-w-full overflow-hidden">
							{items.map(item => {
								return (
									<Chip
										key={item.key}
										classNames={{
											base: 'max-w-full min-w-0 overflow-hidden',
											content: 'w-full overflow-hidden truncate',
										}}
									>
										{item.textValue}
									</Chip>
								);
							})}
						</div>
					);
				}}
				classNames={{
					innerWrapper: 'py-2',
					value: 'text-sm',
				}}
			>
				{boards.map(({ _id, title, thumbImage, bgColor }) => (
					<SelectItem key={_id} textValue={title}>
						<div className="flex flex-row items-center gap-2">
							<div
								style={thumbImage ? { backgroundImage: `url(${thumbImage})` } : undefined}
								className={clsx(
									'h-6 w-8 rounded-md shadow-sm',
									bgColor && `${boardColors[bgColor]}`,
								)}
							></div>
							<span className="truncate">{title}</span>
						</div>
					</SelectItem>
				))}
			</Select>
		</div>
	);
};
