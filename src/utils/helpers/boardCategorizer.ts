import { Board } from '@/types/board.interface';
import { WorkspaceBasic } from '@/types/workspace.interface';

type BoardCategorizer = {
	(
		boards: Board[],
		userId: string,
	): {
		userWorkspacesBoards: Board[];
		starredBoards: Board[];
		guestureWorkspacesBoards: Board[];
		closedBoards: Board[];
		userWorkspaces: WorkspaceBasic[];
	};
};

export const boardCategorizer: BoardCategorizer = (boards, userId) => {
	const open = boards.filter(({ closed }) => !closed);

	const userWorkspacesBoards = open.filter(board => Boolean(board.workspace));

	const allWorkspaces = userWorkspacesBoards
		.map(({ workspace }) => workspace)
		.filter(workspace => workspace !== undefined);

	const uniqueWorkspacesIds = Array.from(new Set(allWorkspaces.map(ws => ws._id)));

	const userWorkspaces = uniqueWorkspacesIds
		.map(id => {
			return allWorkspaces.find(({ _id, members }) => _id === id && members.includes(userId));
		})
		.filter(item => item !== undefined);

	const guestureWorkspacesBoards = open.filter(
		({ workspace }) => !workspace?.members.includes(userId),
	);

	const starredBoards = open.filter(({ starred }) => starred.includes(userId));

	const closedBoards = boards.filter(({ closed }) => closed);

	return {
		userWorkspacesBoards,
		starredBoards,
		guestureWorkspacesBoards,
		closedBoards,
		userWorkspaces,
	};
};
