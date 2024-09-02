import { BoardSettings } from '@/types/board.interface';

export const boardSettings: { value: keyof BoardSettings; label: TranslationKeys }[] = [
	{
		value: 'updateBoard',
		label: 'board.settings_update',
	},
	{
		value: 'addMember',
		label: 'board.settings_member',
	},
	{
		value: 'lists',
		label: 'board.settings_lists',
	},
	{
		value: 'createTask',
		label: 'board.settings_create_task',
	},
	{
		value: 'taskOrder',
		label: 'board.settings_task_order',
	},
	{
		value: 'taskMembers',
		label: 'board.settings_task_members',
	},
	{
		value: 'closeTask',
		label: 'board.settings_close_task',
	},
	{
		value: 'archiveTask',
		label: 'board.settings_archive_task',
	},
	{
		value: 'deleteTask',
		label: 'board.settings_update',
	},
];
