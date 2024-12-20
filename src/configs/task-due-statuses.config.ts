import { IconName } from '@/components/ui/Icon';

export type DueStatus = {
	value: 'none' | 'progress' | 'completed' | 'overdue';
	label: TranslationKeys;
	icon: IconName;
	color: 'default' | 'primary' | 'success' | 'danger';
	hex: string;
	rgb: string;
};

export const dueStatuses: DueStatus[] = [
	{
		value: 'none',
		label: 'task.due_none',
		icon: 'Calendar',
		color: 'default',
		hex: '#d4d4d8',
		rgb: 'rgb(63, 63, 70)',
	},
	{
		value: 'progress',
		label: 'task.due_progress',
		icon: 'CalendarClock',
		color: 'primary',
		hex: '#006fee',
		rgb: 'rgb(0, 111, 238)',
	},
	{
		value: 'completed',
		label: 'task.due_completed',
		icon: 'CalendarCheck2',
		color: 'success',
		hex: '#17c964',
		rgb: 'rgb(23, 201, 100)',
	},
	{
		value: 'overdue',
		label: 'task.due_overdue',
		icon: 'CalendarX2',
		color: 'danger',
		hex: '#f31260',
		rgb: 'rgb(243, 18, 96)',
	},
];
