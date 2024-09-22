'use client';

import { useCurrentUser } from '@/hooks/useCurrentUser';
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
	const { user } = useCurrentUser();

	const permissions = getBoardPermissions(task.board, user?.sub);

	return (
		<>
			<TaskModalHeader task={task} permissions={permissions} />
			<TaskModalGeneral task={task} permissions={permissions} />
			<TaskModalDescription task={task} permissions={permissions} />
			<TaskModalSubtasks task={task} permissions={permissions} />
			<TaskModalComments task={task} permissions={permissions} userId={user?.sub} />
			<TaskModalActivity taskId={task._id} boardId={task.board._id} userId={user?.sub} />
			<TaskModalRemove task={task} permissions={permissions} />
		</>
	);
};
