import { useEffect, useState } from 'react';

import { useBoardState } from '@/hooks/useBoardState';
import { useUser } from '@/hooks/useUser';
import { Board } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { filterTasks } from '@/utils/helpers/filterTasks';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

import { BoardGridByDue } from './BoardGridByDue';
import { BoardGridByLists } from './BoardGridByLists';
import { BoardGridByPriority } from './BoardGridByPriority';
import { BoardGridHeader } from './BoardGridHeader';

type BoardGridViewProps = {
	board: Board;
};

type SortBy = 'lists' | 'priority' | 'due';

export const BoardGridView: React.FC<BoardGridViewProps> = ({ board }) => {
	const user = useUser();
	const { filter } = useBoardState(board._id);
	const { _id, tasks, lists } = board;

	const [sortBy, setSortBy] = useState<SortBy>('lists');
	const [boardTasks, setBoardTasks] = useState<Task[]>(tasks);

	const permissions = getBoardPermissions(board, user._id);

	useEffect(() => {
		const filtered = filterTasks(tasks, filter);
		setBoardTasks(filtered);
	}, [tasks, filter]);

	return (
		<div className="flex flex-col px-4 max-h-full overflow-y-auto">
			<BoardGridHeader
				permissions={permissions}
				boardId={_id}
				tasks={tasks}
				lists={lists}
				sortBy={sortBy}
				changeSorting={value => setSortBy(value)}
			/>
			{sortBy === 'lists' && (
				<BoardGridByLists tasks={boardTasks} board={board} permissions={permissions} />
			)}
			{sortBy === 'priority' && (
				<BoardGridByPriority
					tasks={boardTasks}
					permissions={permissions}
					textColor={board.textColor}
				/>
			)}
			{sortBy === 'due' && <BoardGridByDue tasks={boardTasks} permissions={permissions} />}
		</div>
	);
};
