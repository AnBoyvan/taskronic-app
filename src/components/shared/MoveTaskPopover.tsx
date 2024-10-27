'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { ChangeEvent, ReactNode, useState } from 'react';

import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Select,
	SelectItem,
} from '@nextui-org/react';

import { Icon } from '@/components/ui/Icon';
import { List } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { sorter } from '@/utils/helpers/sorter';

interface MoveTaskPopoverProps {
	trigger: ReactNode;
	currentList: List;
	currentIndex: number;
	lists: List[];
	onMoveSelect: (listId: string, index: number) => void;
	boardTasks: Task[];
}

export const MoveTaskPopover: React.FC<MoveTaskPopoverProps> = ({
	trigger,
	currentList,
	currentIndex,
	lists,
	onMoveSelect,
	boardTasks,
}) => {
	const t = useTranslations();

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [destList, setDestList] = useState<string>(currentList._id);
	const [destIndex, setDestIndex] = useState<number>(currentIndex);
	const [positionsCount, setPositionsCount] = useState<number>(
		boardTasks.filter(task => task.list === currentList._id).length,
	);

	const selectList = (e: ChangeEvent<HTMLSelectElement>) => {
		const listId = e.target.value;

		const selected = lists.find(({ _id }) => _id === listId);
		if (!selected) {
			return;
		}
		const tasksInSelectedList = boardTasks.filter(task => task.list === selected._id);
		setDestList(listId);
		setPositionsCount(
			listId === currentList._id ? tasksInSelectedList.length : tasksInSelectedList.length + 1,
		);
		setDestIndex(listId === currentList._id ? currentIndex : tasksInSelectedList.length);
	};

	const selectPosition = (e: ChangeEvent<HTMLSelectElement>) => {
		const position = e.target.value;
		setDestIndex(Number(position));
	};

	const sortedLists = sorter(lists, 'order');

	const positions = Array(positionsCount).fill(0);

	return (
		<Popover
			placement="bottom"
			offset={0}
			isOpen={isOpen}
			onOpenChange={open => setIsOpen(open)}
			radius="sm"
		>
			<PopoverTrigger>{trigger}</PopoverTrigger>
			<PopoverContent className="p-2 w-80 overflow-auto">
				<p className="font-medium text-center pt-1">{t('task.move')}</p>
				<Button
					isIconOnly
					variant="light"
					size="sm"
					onPress={() => setIsOpen(false)}
					className="absolute top-2 right-2"
				>
					<Icon name="X" size={16} />
				</Button>
				<div className="flex flex-row gap-2 w-full">
					<Select
						aria-label={t('common.list')}
						variant="bordered"
						label={t('common.list')}
						labelPlacement="outside"
						placeholder={t('actions.select')}
						selectionMode="single"
						selectedKeys={[destList]}
						disabledKeys={[destList]}
						disallowEmptySelection
						radius="sm"
						classNames={{
							base: 'text-sm',
							label: 'text-tiny top-2/3',
							popoverContent: 'rounded-lg',
						}}
						onChange={selectList}
					>
						{sortedLists.map(list => (
							<SelectItem
								key={list._id}
								value={list._id}
								title={list.label}
								className="truncate"
								hideSelectedIcon
							/>
						))}
					</Select>
					<Select
						aria-label={t('common.position')}
						variant="bordered"
						label={t('common.position')}
						labelPlacement="outside"
						placeholder={t('actions.select')}
						selectionMode="single"
						selectedKeys={[String(destIndex)]}
						disabledKeys={Boolean(destList === currentList._id) ? [currentIndex.toString()] : []}
						disallowEmptySelection
						onChange={selectPosition}
						radius="sm"
						classNames={{
							base: 'text-sm min-w-20 w-20',
							label: `text-tiny top-2/3`,
							popoverContent: 'rounded-lg',
						}}
					>
						{positions.map((_, idx) => (
							<SelectItem
								key={idx.toString()}
								value={idx.toString()}
								title={String(idx + 1)}
								isReadOnly={Boolean(destList === currentList._id && idx === currentIndex)}
								className={clsx(
									Boolean(destList === currentList._id && idx === currentIndex)
										? 'text-primary font-medium'
										: '',
								)}
								hideSelectedIcon
							/>
						))}
					</Select>
				</div>
				<Button
					variant="solid"
					color="primary"
					size="md"
					radius="sm"
					onPress={() => {
						onMoveSelect(destList, destIndex);
						setIsOpen(false);
					}}
					className="mt-2 mr-auto"
				>
					{t('actions.move')}
				</Button>
			</PopoverContent>
		</Popover>
	);
};
