import { TasksFilter } from './filterTasks';

export const isFiltered = (filter: TasksFilter): boolean => {
	const { search, boards, priority, dueStatuses, workspaces, lists, members } = filter;

	return (
		!!search ||
		Boolean(boards && boards.length > 0) ||
		Boolean(priority && priority.length > 0) ||
		Boolean(dueStatuses && dueStatuses.length > 0) ||
		Boolean(workspaces && workspaces.length > 0) ||
		Boolean(lists && lists.length > 0) ||
		Boolean(members && members.length > 0)
	);
};
