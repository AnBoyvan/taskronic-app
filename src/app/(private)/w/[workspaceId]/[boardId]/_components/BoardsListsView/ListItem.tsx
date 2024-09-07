'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { Draggable, Droppable } from '@hello-pangea/dnd';

import { BoardPermissions, List } from '@/types/board.interface';
import { TaskBoardField } from '@/types/tasks.interface';

import { AddTaskButton } from './AddTaskButton';
import { ListHeader } from './ListHeader';
import { TaskCard } from './TaskCard';

type ListItemProps = {
	list: List;
	tasks: TaskBoardField[];
	index: number;
	permissions: BoardPermissions;
	boardId: string;
	boardLists: List[];
	onTasksMove: (sourceList: string, destList: string) => void;
	onListMove: (sourceIndex: number, destIndex: number) => void;
	onTaskOpen: (taskId: string) => void;
};

export const ListItem: React.FC<ListItemProps> = ({
	list,
	tasks,
	index,
	permissions,
	boardId,
	boardLists,
	onTasksMove,
	onListMove,
	onTaskOpen,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false);

	if (list.archived) {
		return null;
	}

	return (
		<Draggable draggableId={list._id} index={index} isDragDisabled={!permissions.lists}>
			{provided => (
				<li
					{...provided.draggableProps}
					ref={provided.innerRef}
					className="shrink-0 h-full mx-1.5 w-64 select-none"
				>
					<div
						{...provided.dragHandleProps}
						className={`w-full rounded-lg ${list.bgColor} shadow-md pb-2`}
					>
						<ListHeader
							list={list}
							canEdit={permissions.lists}
							boardId={boardId}
							boardLists={boardLists}
							onTaskAdd={() => setIsEditing(true)}
							onTasksMove={onTasksMove}
							onListMove={onListMove}
						/>
						<Droppable droppableId={list._id} type="task">
							{provided => (
								<ol
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={clsx('mx-2 py-0.5 flex flex-col')}
								>
									{tasks.map((task, idx) => (
										<TaskCard
											key={task._id}
											index={idx}
											task={task}
											permissions={permissions}
											onTaskOpen={onTaskOpen}
										/>
									))}
									{provided.placeholder}
								</ol>
							)}
						</Droppable>
						{permissions.createTask && (
							<AddTaskButton
								boardId={boardId}
								listId={list._id}
								textColor={list.textColor}
								isEditing={isEditing}
								setEditing={value => setIsEditing(value)}
							/>
						)}
					</div>
				</li>
			)}
		</Draggable>
	);
};
