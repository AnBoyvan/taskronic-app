import { TaskBoardField, TaskWorkspaceField } from '@/interfaces/tasks.interface';

export const getTasksQuantity = (
	tasks: TaskWorkspaceField[] | TaskBoardField[],
): { active: number; completed: number } => {
	const notArchived = tasks.filter(t => !t.archived);
	const completed = notArchived.filter(t => t.completed);

	return { active: notArchived.length, completed: completed.length };
};
