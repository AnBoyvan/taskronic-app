'use client';

import { useTranslations } from 'next-intl';

import { Key, useCallback, useMemo, useState } from 'react';

import {
	SortDescriptor,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';

import { Task } from '@/types/tasks.interface';
import { tasksTableSorter } from '@/utils/helpers/tasksTableSorter';

import { TaskBoardCell } from './TaskBoardCell';
import { TaskDueDateCell } from './TaskDueDateCell';
import { TaskListCell } from './TaskListCell';
import { TaskPriorityCell } from './TaskPriorityCell';
import { tasksTableColumns } from './tasks-table-columns';
import { TaskTitleCell } from './TaskTitleCell';

type TasksTableViewProps = {
	tasks: Task[];
};

export const TasksTableView: React.FC<TasksTableViewProps> = ({ tasks }) => {
	const t = useTranslations();

	const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
		column: 'title',
		direction: 'ascending',
	});

	const renderCell = useCallback((task: Task, columnKey: Key) => {
		const list = task.board.lists.find(({ _id }) => _id === task.list);

		switch (columnKey) {
			case 'title':
				return <TaskTitleCell taskId={task._id} title={task.title} />;

			case 'priority':
				return <TaskPriorityCell priority={task.priority} />;

			case 'list':
				return <TaskListCell listLabel={list?.label} />;

			case 'dueDate':
				return <TaskDueDateCell dueDate={task.dueDate} completed={task.completed} />;

			case 'board':
				return <TaskBoardCell board={task.board} workspace={task.workspace} />;

			default:
				return <></>;
		}
	}, []);

	const sortedTasks = useMemo(() => {
		return tasksTableSorter(tasks, [], sortDescriptor);
	}, [sortDescriptor, tasks]);

	return (
		<Table
			aria-label={t('common.tasks')}
			isHeaderSticky
			removeWrapper
			sortDescriptor={sortDescriptor}
			onSortChange={setSortDescriptor}
			classNames={{
				base: 'hidden lg:flex flex-col px-0 py-8 overflow-auto',
				table: 'flex flex-col min-h-20 h-full ',
				tbody: 'overflow-y-auto max-h-full',
				th: 'pl-2 pr-0 flex items-center ',
				tr: 'grid min-h-11 grid-cols-[3fr_96px_2fr_140px_2fr]',
				td: 'p-0 pl-2 flex items-center overflow-hidden',
			}}
		>
			<TableHeader columns={tasksTableColumns}>
				{column => (
					<TableColumn key={column.key} allowsSorting={column.sortable}>
						{t(column.label)}
					</TableColumn>
				)}
			</TableHeader>
			<TableBody items={sortedTasks} emptyContent={t('task.task_not_found')}>
				{item => (
					<TableRow key={item._id} className="border-b-1">
						{columnKey => <TableCell>{renderCell(item, columnKey)}</TableCell>}
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
};
