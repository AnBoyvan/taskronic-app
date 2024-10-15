import { priorityColors, PriorityColors } from '@/constants/priority-colors';
import { Priority } from '@/types/root.interface';

export type PriorityLevel = {
	value: Priority;
	label: TranslationKeys;
	color: PriorityColors[Priority];
	hex: string;
	rgb: string;
};

export const priorityConfig: PriorityLevel[] = [
	{
		value: Priority.NO,
		label: `priority.${Priority.NO}`,
		color: priorityColors[Priority.NO],
		hex: '#d4d4d8',
		rgb: 'rgb(63, 63, 70)',
	},
	{
		value: Priority.LOW,
		label: `priority.${Priority.LOW}`,
		color: priorityColors[Priority.LOW],
		hex: '#93c5fd',
		rgb: 'rgb(147, 197, 253)',
	},
	{
		value: Priority.MEDIUM,
		label: `priority.${Priority.MEDIUM}`,
		color: priorityColors[Priority.MEDIUM],
		hex: '#17c964',
		rgb: 'rgb(23, 201, 100)',
	},
	{
		value: Priority.HIGH,
		label: `priority.${Priority.HIGH}`,
		color: priorityColors[Priority.HIGH],
		hex: '#f5a524',
		rgb: 'rgb(245, 165, 36)',
	},
	{
		value: Priority.CRITICAL,
		label: `priority.${Priority.CRITICAL}`,
		color: priorityColors[Priority.CRITICAL],
		hex: '#f31260',
		rgb: 'rgb(243, 18, 96)',
	},
];
