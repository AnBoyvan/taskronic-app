import clsx from 'clsx';
import { useState } from 'react';

import { Divider } from '@nextui-org/react';

import { Section } from '@/components/layout/Section';
import { TaskCard } from '@/components/shared/TaskCard';
import { useReorder } from '@/hooks/useReorder';
import { Board, BoardPermissions, List } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { sorter } from '@/utils/helpers/sorter';

import { ListHeader } from '../BoardView/ListHeader';

type BoardGridByListsProps = {
	board: Board;
	tasks: Task[];
	permissions: BoardPermissions;
};

export const BoardGridByLists: React.FC<BoardGridByListsProps> = ({
	tasks,
	board,
	permissions,
}) => {
	const { listsReorder, moveTasksToList } = useReorder(board);

	const [orderedLists, setOrderedLists] = useState<List[]>(sorter(board.lists, 'order'));

	const [boardTasks, setBoardTasks] = useState<Task[]>(tasks);

	const moveTasks = (sourceList: string, destList: string) => {
		const data = moveTasksToList(sourceList, destList);
		setBoardTasks(data as Task[]);
	};

	const moveList = (sourceIndex: number, destIndex: number) => {
		const data = listsReorder(sourceIndex, destIndex);
		setOrderedLists(data);
	};

	return (
		<>
			{orderedLists.map(list => (
				<Section key={list._id} noTopMargin className="flex flex-col gap-2 mt-2">
					<div className={clsx('pt-1 pb-4 h-14 rounded shadow-md', list.bgColor)}>
						<ListHeader
							list={list}
							boardId={board._id}
							permissions={permissions}
							boardLists={board.lists}
							onTasksMove={moveTasks}
							onListMove={moveList}
						/>
					</div>
					<div className="w-full grid gap-2 grid-cols-[repeat(auto-fill,minmax(240px,1fr))]">
						{tasks
							.filter(task => task.list === list._id)
							.map(task => (
								<TaskCard key={task._id} task={task} permissions={permissions} />
							))}
					</div>
					<Divider className="my-4" />
				</Section>
			))}
		</>
	);
};
