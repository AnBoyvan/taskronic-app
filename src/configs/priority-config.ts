import { priorityColors, PriorityColors } from '@/constants/priority-colors';
import { Priority } from '@/types/root.interface';

export type PriorityLevel = {
	value: Priority;
	label: TranslationKeys;
	color: PriorityColors[Priority];
};

export const priorityConfig: PriorityLevel[] = [
	{
		value: Priority.NO,
		label: `priority.${Priority.NO}`,
		color: priorityColors[Priority.NO],
	},
	{
		value: Priority.LOW,
		label: `priority.${Priority.LOW}`,
		color: priorityColors[Priority.LOW],
	},
	{
		value: Priority.MEDIUM,
		label: `priority.${Priority.MEDIUM}`,
		color: priorityColors[Priority.MEDIUM],
	},
	{
		value: Priority.HIGH,
		label: `priority.${Priority.HIGH}`,
		color: priorityColors[Priority.HIGH],
	},
	{
		value: Priority.CRITICAL,
		label: `priority.${Priority.CRITICAL}`,
		color: priorityColors[Priority.CRITICAL],
	},
];
