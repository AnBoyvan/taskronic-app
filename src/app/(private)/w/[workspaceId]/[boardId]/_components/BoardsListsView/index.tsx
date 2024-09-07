'use client';

import { useEffect, useState } from 'react';

import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useReorder } from '@/hooks/useReorder';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { Board, List } from '@/types/board.interface';
import { TaskBoardField } from '@/types/tasks.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

import { AddListButton } from './AddListButton';
import { ListItem } from './ListItem';

type BoardsListsViewProps = {
	board: Board;
};

export const BoardsListsView: React.FC<BoardsListsViewProps> = ({ board }) => {
	const { user } = useCurrentUser();
	const { current } = useWorkspacesList();
	const { listsReorder, tasksReorder, moveTasksToList } = useReorder(board);

	const { _id, lists, tasks } = board;

	const [osrderedLists, setOrderedLists] = useState<List[]>(lists);

	const [boardTasks, setBoardTasks] = useState<TaskBoardField[]>(tasks);

	const openTaskModal = (taskId: string) => {
		// TODO:
		console.log(taskId);
	};

	const moveTasks = (sourceList: string, destList: string) => {
		const data = moveTasksToList(sourceList, destList);
		setBoardTasks(data);
	};

	const moveList = (sourceIndex: number, destIndex: number) => {
		const data = listsReorder(sourceIndex, destIndex);
		setOrderedLists(data);
	};

	const onDragEnd = (result: DropResult) => {
		const { destination, source, type } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === 'list') {
			const data = listsReorder(source.index, destination.index);
			setOrderedLists(data);
		}

		if (type === 'task') {
			const data = tasksReorder(
				source.droppableId,
				source.index,
				destination.droppableId,
				destination.index,
			);
			setBoardTasks(data);
		}
	};

	const permissions = getBoardPermissions(board, user?.sub, current?.admins.includes(user?.sub!));

	useEffect(() => {
		setOrderedLists(lists);
	}, [lists]);

	useEffect(() => {
		setBoardTasks(tasks);
	}, [tasks]);

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="lists" type="list" direction="horizontal">
				{provided => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex h-full py-3 px-1.5 overflow-auto"
					>
						{osrderedLists.map((list, idx) => {
							return (
								<ListItem
									key={list._id}
									index={idx}
									list={list}
									tasks={boardTasks.filter(task => task.list === list._id)}
									permissions={permissions}
									boardId={_id}
									boardLists={osrderedLists}
									onTasksMove={moveTasks}
									onListMove={moveList}
									onTaskOpen={openTaskModal}
								/>
							);
						})}
						{provided.placeholder}
						{permissions.lists && <AddListButton boardId={_id} />}
						<div className="flex-shrink-0 w-1" />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	);
};