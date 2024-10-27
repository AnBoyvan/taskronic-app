'use client';

import { useTranslations } from 'next-intl';

import clsx from 'clsx';
import { Key, useCallback, useEffect, useMemo, useState } from 'react';

import {
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { useBoardState } from '@/hooks/useBoardState';
import { useUser } from '@/hooks/useUser';
import { Board } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { filterTasks } from '@/utils/helpers/filterTasks';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';
import { tasksTableSorter } from '@/utils/helpers/tasksTableSorter';

import { boardTableColumns } from './board-table-columns';
import { BoardTableTopContent } from './BoardTableTopContent';
import { DueDateCell } from './DueDateCell';
import { ListCell } from './ListCell';
import { MembersCell } from './MembersCell';
import { PriorityCell } from './PriorityCell';
import { TitleCell } from './TitleCell';

type BoardTableViewProps = {
	board: Board;
};

export const BoardTableView: React.FC<BoardTableViewProps> = ({ board }) => {
	const t = useTranslations();
	const user = useUser();
	const { filter } = useBoardState(board._id);

	const [boardTasks, setBoardTasks] = useState<Task[]>(board.tasks);
	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'list',
		direction: 'ascending',
	});

	const permissions = getBoardPermissions(board, user._id);

	const renderCell = useCallback((task: Task, columnKey: Key) => {
		switch (columnKey) {
			case 'title':
				return <TitleCell taskId={task._id} title={task.title} />;

			case 'priority':
				return (
					<PriorityCell
						taskId={task._id}
						priority={task.priority}
						canEdit={permissions?.createTask}
						textColor={board.textColor}
					/>
				);

			case 'list':
				return <ListCell task={task} canEdit={permissions.createTask} />;

			case 'dueDate':
				return <DueDateCell task={task} permissions={permissions} textColor={board.textColor} />;

			case 'members':
				return <MembersCell task={task} permissions={permissions} textColor={board.textColor} />;

			default:
				return <></>;
		}
	}, []);

	useEffect(() => {
		const filtered = filterTasks(board.tasks, filter);
		setBoardTasks(filtered);
	}, [board.tasks, filter]);

	const sortedTasks = useMemo(() => {
		return tasksTableSorter(boardTasks, board.lists, sortDescriptor);
	}, [sortDescriptor, boardTasks]);

	return (
		<Section noTopMargin className="flex p-0 h-full w-full overflow-x-auto overflow-hidden">
			<Table
				aria-label={t('common.tasks')}
				isHeaderSticky
				removeWrapper
				sortDescriptor={sortDescriptor}
				onSortChange={setSortDescriptor}
				layout="fixed"
				classNames={{
					base: clsx('flex flex-col p-4 min-w-[750px]', board.textColor),
					table: 'flex flex-col min-h-20 h-full max-h-full overflow-hidden',
					tbody: 'overflow-y-auto max-h-full',
					th: 'pl-2 pr-0 flex items-center z-0',
					tr: 'grid min-h-10 grid-cols-[3fr_96px_2fr_140px_120px]',
					td: 'p-0 pl-2 flex items-center overflow-hidden',
				}}
				topContentPlacement="outside"
				topContent={
					<BoardTableTopContent boardId={board._id} lists={board.lists} permissions={permissions} />
				}
			>
				<TableHeader columns={boardTableColumns}>
					{column => (
						<TableColumn key={column.key} allowsSorting={column.sortable}>
							{t(column.label)}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={sortedTasks} emptyContent={t('task.not_found')}>
					{item => (
						<TableRow key={item._id} className="border-b-1">
							{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Section>
	);
};
