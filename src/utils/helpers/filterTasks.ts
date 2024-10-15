import { Priority } from '@/types/root.interface';
import { Task } from '@/types/tasks.interface';

export type TasksFilter = {
	search?: string;
	priority?: Array<Priority>;
	dueStatuses?: Array<'none' | 'completed' | 'progress' | 'overdue'>;
	workspaces?: string[];
	boards?: string[];
	lists?: string[];
	members?: string[];
};

interface FilterTasks {
	(tasks: Task[], filter: TasksFilter): Task[];
}

export const defaultTaskFilter = {
	search: '',
	priority: [],
	dueDate: [],
	workspaces: [],
	boards: [],
};

export const defaultBoardFilter = {
	search: '',
	priority: [],
	dueDate: [],
	lists: [],
	members: [],
};

export const filterTasks: FilterTasks = (
	tasks,
	{ search, priority, dueStatuses, workspaces, boards, lists, members },
) => {
	let filtered: Task[] = tasks;

	const isExpired = (dueTo: string): boolean => {
		return Date.now() > new Date(dueTo).getTime();
	};

	if (search) {
		filtered = filtered.filter(t => t.title.toLowerCase().includes(search.toLowerCase()));
	}

	if (priority && priority?.length > 0) {
		filtered = filtered.filter(t => priority.includes(t.priority));
	}

	if (boards && boards?.length > 0) {
		filtered = filtered.filter(t => boards.includes(t.board._id));
	}

	if (workspaces && workspaces?.length > 0) {
		filtered = filtered.filter(t => workspaces.includes(t.workspace._id));
	}

	if (dueStatuses && dueStatuses?.length > 0) {
		let filteredByDueDate: Task[] = [];

		if (dueStatuses.includes('none')) {
			filteredByDueDate = [...filteredByDueDate, ...filtered.filter(t => !t.dueDate)];
		}

		if (dueStatuses.includes('completed')) {
			filteredByDueDate = [...filteredByDueDate, ...filtered.filter(t => t.dueDate && t.completed)];
		}

		if (dueStatuses.includes('progress')) {
			filteredByDueDate = [
				...filteredByDueDate,
				...filtered.filter(t => t.dueDate && !isExpired(t.dueDate) && !t.completed),
			];
		}

		if (dueStatuses.includes('overdue')) {
			filteredByDueDate = [
				...filteredByDueDate,
				...filtered.filter(t => t.dueDate && isExpired(t.dueDate) && !t.completed),
			];
		}

		filtered = filteredByDueDate;
	}

	if (lists && lists?.length > 0) {
		filtered = filtered.filter(t => lists.includes(t.list));
	}

	if (members && members?.length > 0) {
		filtered = filtered.filter(t => t.members.some(member => members.includes(member._id)));
	}

	return filtered;
};
