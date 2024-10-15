export type TasksTableColumn = {
	key: string;
	label: TranslationKeys;
	sortable: boolean;
};

export const tasksTableColumns: TasksTableColumn[] = [
	{
		key: 'title',
		label: 'common.task',
		sortable: true,
	},
	{
		key: 'priority',
		label: 'common.priority',
		sortable: true,
	},
	{
		key: 'list',
		label: 'common.list',
		sortable: false,
	},
	{
		key: 'dueDate',
		label: 'task.due_date',
		sortable: true,
	},
	{
		key: 'board',
		label: 'common.board',
		sortable: false,
	},
];
