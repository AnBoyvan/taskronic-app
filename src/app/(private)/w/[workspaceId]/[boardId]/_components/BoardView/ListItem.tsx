'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { Draggable, Droppable } from '@hello-pangea/dnd';

import { BoardPermissions, List } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';

import { AddTaskButton } from './AddTaskButton';
import { DraggableTask } from './DraggableTask';
import { ListHeader } from './ListHeader';

type ListItemProps = {
	list: List;
	tasks: Task[];
	index: number;
	permissions: BoardPermissions;
	boardId: string;
	boardLists: List[];
	onTasksMove: (sourceList: string, destList: string) => void;
	onListMove: (sourceIndex: number, destIndex: number) => void;
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
					className="block shrink-0 h-full px-2 w-[272px] select-none"
				>
					<div
						{...provided.dragHandleProps}
						className={`flex flex-col max-h-full w-full rounded-lg ${list.bgColor} shadow-md pb-2`}
					>
						<ListHeader
							list={list}
							permissions={permissions}
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
									className={clsx(
										'px-2 py-0.5 flex flex-col gap-2 max-h-full overflow-y-auto flex-grow',
										tasks.length > 0 ? 'mt-2' : 'mt-0',
									)}
								>
									{tasks.map((task, idx) => (
										<DraggableTask
											key={task._id}
											index={idx}
											task={task}
											permissions={permissions}
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
