export type TasksTableColumn = {
	key: string;
	label: TranslationKeys;
};

export const tasksTableColumns: TasksTableColumn[] = [
	{
		key: 'title',
		label: 'label.title',
	},
	{
		key: 'priority',
		label: 'common.priority',
	},
	{
		key: 'list',
		label: 'common.list',
	},
	{
		key: 'due',
		label: 'task.due_date',
	},
	{
		key: 'board',
		label: 'common.board',
	},
];
