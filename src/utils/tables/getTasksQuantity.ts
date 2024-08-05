import { ITaskBoardField, ITaskWorkspaceField } from '@/interfaces/tasks.interface';

export const getTasksQuantity = (
	tasks: ITaskWorkspaceField[] | ITaskBoardField[],
): { active: number; completed: number } => {
	const notArchived = tasks.filter(t => !t.archived);
	const completed = notArchived.filter(t => t.completed);

	return { active: notArchived.length, completed: completed.length };
};
