import { SortDescriptor } from '@nextui-org/react';

import { List } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { sorter } from './sorter';

type TasksTableSorter = (tasks: Task[], lists: List[], descriptor: SortDescriptor) => Task[];

export const tasksTableSorter: TasksTableSorter = (tasks, lists, { column, direction }) => {
	const byOrder = sorter(tasks, 'order', direction);

	if (column === 'title') {
		return sorter(tasks, 'createdAt', direction);
	}

	if (column === 'priority') {
		return sorter(byOrder, 'priority', direction);
	}

	if (column === 'dueDate') {
		return sorter(byOrder, 'dueDate', direction);
	}

	const sortedLists = sorter(lists, 'order', direction);
	return sortedLists.flatMap(({ _id }) => byOrder.filter(({ list }) => list === _id));
};
