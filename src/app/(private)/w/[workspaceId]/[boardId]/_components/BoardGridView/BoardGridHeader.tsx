'use client';

import { useTranslations } from 'next-intl';

import { Select, SelectItem, SharedSelection } from '@nextui-org/react';

import { BoardPermissions, List } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { AddListPopover } from '../AddListPopover';
import { AddTaskPopover } from '../AddTaskPopover';

type BoardGridHeaderProps = {
	permissions: BoardPermissions;
	boardId: string;
	tasks: Task[];
	lists: List[];
	sortBy: 'lists' | 'priority' | 'due';
	changeSorting: (sortBy: 'lists' | 'priority' | 'due') => void;
};

export const BoardGridHeader: React.FC<BoardGridHeaderProps> = ({
	permissions,
	boardId,
	lists,
	sortBy,
	changeSorting,
}) => {
	const t = useTranslations();

	const handleChangeSorting = (keys: SharedSelection) => {
		const selected = Array.from(keys).join(', ');
		if (selected === 'lists' || selected === 'priority' || selected === 'due') {
			changeSorting(selected);
		}
	};

	return (
		<div className="flex flex-row w-full py-4 items-center justify-between gap-4 flex-wrap">
			<Select
				aria-label={t('label.sort')}
				disallowEmptySelection
				selectionMode="single"
				variant="faded"
				size="md"
				fullWidth={false}
				classNames={{
					base: 'flex w-fit',
					innerWrapper: 'w-fit pr-7',
				}}
				popoverProps={{
					className: 'w-fit',
				}}
				selectedKeys={[sortBy]}
				onSelectionChange={key => handleChangeSorting(key)}
			>
				<SelectItem key="lists" aria-label={t('sort.by_lists')} className="w-fit">
					{t('sort.by_lists')}
				</SelectItem>
				<SelectItem key="priority" aria-label={t('sort.by_priority')} className="w-fit">
					{t('sort.by_priority')}
				</SelectItem>
				<SelectItem key="due" aria-label={t('sort.by_due')} className="w-fit">
					{t('sort.by_due')}
				</SelectItem>
			</Select>
			<div className="inline-flex flex-row justify-around gap-4">
				{permissions?.createTask && <AddTaskPopover boardId={boardId} lists={lists} />}
				{permissions?.lists && <AddListPopover boardId={boardId} />}
			</div>
		</div>
	);
};