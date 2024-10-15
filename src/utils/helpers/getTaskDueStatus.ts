import { DueStatus, dueStatuses } from '@/configs/task-due-statuses.config';

type GetTaskDueStatus = {
	(dueDate: string | null, completed: boolean): DueStatus;
};

export const getTaskDueStatus: GetTaskDueStatus = (dueDate, completed) => {
	let status: DueStatus | undefined = undefined;

	const isExpired = (dueTo: string): boolean => {
		return Date.now() > new Date(dueTo).getTime();
	};

	if (dueDate && !completed) {
		status = dueStatuses.find(({ value }) => value === 'progress');
	}

	if (dueDate && completed) {
		status = dueStatuses.find(({ value }) => value === 'completed');
	}

	if (dueDate && !completed && isExpired(dueDate)) {
		status = dueStatuses.find(({ value }) => value === 'overdue');
	}

	return status ? status : dueStatuses[0];
};
