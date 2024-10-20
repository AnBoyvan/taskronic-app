import { IconName } from '@/components/ui/Icon';

import { ROUTES } from './routes.config';

type NavItemConfig = { label: TranslationKeys; value: string; icon: IconName };

export const dashboardNav: NavItemConfig[] = [
	{
		label: 'nav.boards',
		value: ROUTES.BOARDS,
		icon: 'Trello',
	},
	{
		label: 'nav.tasks',
		value: ROUTES.TASKS,
		icon: 'ListTodo',
	},
	{
		label: 'nav.notes',
		value: ROUTES.NOTES,
		icon: 'NotebookPen',
	},
	{
		label: 'nav.calendar',
		value: ROUTES.CALENDAR,
		icon: 'CalendarCheck2',
	},
];

export const workspaceNav = (_id: string): NavItemConfig[] => [
	{
		label: 'nav.boards',
		value: `${ROUTES.WORKSPACE}/${_id}`,
		icon: 'Trello',
	},
	{
		label: 'common.members',
		value: `${ROUTES.WORKSPACE}/${_id}/members`,
		icon: 'Users',
	},
	{
		label: 'common.settings',
		value: `${ROUTES.WORKSPACE}/${_id}/settings`,
		icon: 'Settings',
	},
];

export const profileNav: NavItemConfig[] = [
	{
		label: 'account.profile',
		value: ROUTES.PROFILE,
		icon: 'User',
	},
	{
		label: 'common.activity',
		value: `${ROUTES.PROFILE}/activity`,
		icon: 'Users',
	},
	{
		label: 'common.settings',
		value: `${ROUTES.PROFILE}/settings`,
		icon: 'Activity',
	},
];
