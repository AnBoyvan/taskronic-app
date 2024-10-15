import { Board } from '@/types/board.interface';
import { Task } from '@/types/tasks.interface';
import { WorkspaceBasic } from '@/types/workspace.interface';

type GetBoardsAndWorkpaces = {
	(tasks: Task[]): {
		boards: Board[];
		workspaces: WorkspaceBasic[];
	};
};

export const getBoardsAndWorkpaces: GetBoardsAndWorkpaces = tasks => {
	const allBoards = tasks.map(({ board }) => board);

	const uniqueBoardsIds = Array.from(new Set(allBoards.map(ws => ws._id)));

	const uniqueBoards = uniqueBoardsIds
		.map(id => {
			return allBoards.find(({ _id }) => _id === id);
		})
		.filter(item => item !== undefined);

	const allWorkspaces = tasks.map(({ workspace }) => workspace);

	const uniqueWorkspacesIds = Array.from(new Set(allWorkspaces.map(ws => ws._id)));

	const uniqueWorkspaces = uniqueWorkspacesIds
		.map(id => {
			return allWorkspaces.find(({ _id }) => _id === id);
		})
		.filter(item => item !== undefined);

	return {
		boards: uniqueBoards,
		workspaces: uniqueWorkspaces,
	};
};
