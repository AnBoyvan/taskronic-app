import { TaskDetails } from '@/components/shared/TaskDetails';
import { BoardPermissions } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

type DueDateCellProps = {
	task: Task;
	permissions: BoardPermissions;
	textColor?: string;
};

export const DueDateCell: React.FC<DueDateCellProps> = ({ task, permissions, textColor }) => {
	return (
		<div className="flex flex-row items-center justify-start -ml-2">
			<TaskDetails task={task} permissions={permissions} textColor={textColor} dueDateOnly />
		</div>
	);
};
