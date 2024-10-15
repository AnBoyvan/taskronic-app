export type BoardTableColumn = {
	key: string;
	label: TranslationKeys;
	sortable: boolean;
};

export const boardTableColumns: BoardTableColumn[] = [
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
		sortable: true,
	},
	{
		key: 'dueDate',
		label: 'task.due_date',
		sortable: true,
	},
	{
		key: 'members',
		label: 'common.members',
		sortable: false,
	},
];
