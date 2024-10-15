import { Task } from '@/types/tasks.interface';

type TasksByDueStatus = {
	(tasks: Task[]): {
		none: Task[];
		progress: Task[];
		completed: Task[];
		overdue: Task[];
	};
};

export const tasksByDueStatus: TasksByDueStatus = tasks => {
	const isExpired = (dueTo: string): boolean => {
		return Date.now() > new Date(dueTo).getTime();
	};

	const none = tasks.filter(t => !t.dueDate);

	const progress = tasks.filter(t => t.dueDate && !isExpired(t.dueDate) && !t.completed);

	const completed = tasks.filter(t => t.dueDate && t.completed);

	const overdue = tasks.filter(t => t.dueDate && isExpired(t.dueDate) && !t.completed);

	return { none, progress, completed, overdue };
};
