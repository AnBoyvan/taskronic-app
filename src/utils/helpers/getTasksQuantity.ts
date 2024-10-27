import { Task, TaskBasic } from '@/types/tasks.interface';

export const getTasksQuantity = (
	tasks: Task[] | TaskBasic[],
): { active: number; completed: number } => {
	const notArchived = tasks.filter(t => !t.archived);
	const completed = notArchived.filter(t => t.completed);

	return { active: notArchived.length, completed: completed.length };
};
