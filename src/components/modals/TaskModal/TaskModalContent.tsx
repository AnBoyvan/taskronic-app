'use client';

import { useUser } from '@/hooks/useUser';
import { Task } from '@/types/tasks.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

import { TaskModalActivity } from './TaskModalActivity';
import { TaskModalComments } from './TaskModalComments';
import { TaskModalDescription } from './TaskModalDescription';
import { TaskModalGeneral } from './TaskModalGeneral';
import { TaskModalHeader } from './TaskModalHeader';
import { TaskModalRemove } from './TaskModalRemove';
import { TaskModalSubtasks } from './TaskModalSubtasks';

type TaskModalContentProps = {
	task: Task;
};

export const TaskModalContent: React.FC<TaskModalContentProps> = ({ task }) => {
	const { _id } = useUser();

	const permissions = getBoardPermissions(task.board, _id);

	return (
		<>
			<TaskModalHeader task={task} permissions={permissions} />
			<TaskModalGeneral task={task} permissions={permissions} />
			<TaskModalDescription task={task} permissions={permissions} />
			<TaskModalSubtasks task={task} permissions={permissions} />
			<TaskModalComments task={task} permissions={permissions} userId={_id} />
			<TaskModalActivity taskId={task._id} boardId={task.board._id} userId={_id} />
			<TaskModalRemove task={task} permissions={permissions} />
		</>
	);
};
