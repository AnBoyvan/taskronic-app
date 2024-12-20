import { Priority } from '@/types/root.interface';

export type PriorityColors = Record<Priority, string>;

export const priorityColors: PriorityColors = {
	1: 'bg-transparent text-foreground',
	2: 'bg-blue-300 text-[#27272A]',
	3: 'bg-success text-success-foreground',
	4: 'bg-warning text-warning-foreground',
	5: 'bg-danger text-danger-foreground',
};
