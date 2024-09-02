import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useWorkspacesList } from '@/hooks/useWorkspacesList';
import { Board } from '@/types/board.interface';
import { getBoardPermissions } from '@/utils/helpers/getBoardPermissions';

import { BoardListViewAddButton } from './BoardListViewAddButton';

type BoardsListsViewProps = {
	board: Board;
};

//ListContainer
export const BoardsListsView: React.FC<BoardsListsViewProps> = ({ board }) => {
	const { user } = useCurrentUser();
	const { current } = useWorkspacesList();

	const { _id, lists, tasks } = board;

	const { updateBoard, isAdmin, addMember, createTask } = getBoardPermissions(
		board,
		user?.sub,
		current?.admins.includes(user?.sub!),
	);

	return (
		<ol className="h-full p-2 overflow-x-auto">
			{/* {lists.length > 0 && (
				<List list={lists[0]} tasks={tasks.filter(({ list }) => list === lists[0]._id)} />
			)} */}
			{createTask && <BoardListViewAddButton boardId={_id} />}

			<div className="flex-shrink-0 w-1" />
		</ol>
	);
};
