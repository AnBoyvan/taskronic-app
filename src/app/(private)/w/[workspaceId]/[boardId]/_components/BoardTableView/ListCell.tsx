'use client';

import { useState } from 'react';

import { Button } from '@nextui-org/react';

import { MoveTaskPopover } from '@/components/shared/MoveTaskPopover';
import { useReorder } from '@/hooks/useReorder';
import { Task } from '@/types/tasks.interface';

type ListCellProps = {
	task: Task;
	canEdit?: boolean;
};

export const ListCell: React.FC<ListCellProps> = ({ task, canEdit }) => {
	const { tasksReorder } = useReorder(task.board);

	const [currentPosition, setCurrentPosition] = useState<{ listId: string; position: number }>({
		listId: task.list,
		position: task.order,
	});

	const currentList = task.board.lists.find(list => list._id === currentPosition.listId);

	if (!currentList) {
		return null;
	}

	const handleTaskMove = (listId: string, index: number) => {
		tasksReorder(task.list, task.order, listId, index);
		setCurrentPosition({ listId, position: index });
	};

	return (
		<>
			{canEdit ? (
				<MoveTaskPopover
					trigger={
						<Button
							fullWidth
							variant="light"
							radius="none"
							className="px-0 -ml-2 pl-2 h-full justify-start overflow-hidden text-nowrap truncate"
						>
							{currentList.label}
						</Button>
					}
					currentList={currentList}
					currentIndex={currentPosition.position}
					lists={task.board.lists}
					onMoveSelect={handleTaskMove}
					boardTasks={task.board.tasks}
				/>
			) : (
				<span className="px-0 h-full justify-start overflow-hidden text-nowrap truncate">
					{currentList.label}
				</span>
			)}
		</>
	);
};
