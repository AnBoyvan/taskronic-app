import { Board, BoardPermissions } from '@/types/board.interface';

type GetBoardPermissions = {
	(board: Board, userId?: string, isWorkspaceAdmin?: boolean): BoardPermissions;
};

export const getBoardPermissions: GetBoardPermissions = (board, userId, isWorkspaceAdmin) => {
	const isAdmin = board.admins.includes(userId!) || Boolean(isWorkspaceAdmin);
	const isMember = board.members.some(({ _id }) => _id === userId);

	if (isAdmin) {
		return {
			isAdmin,
			updateBoard: true,
			addMember: true,
			lists: true,
			createTask: true,
			taskOrder: true,
			taskMembers: true,
			closeTask: true,
			archiveTask: true,
			deleteTask: true,
		};
	}

	if (!isMember) {
		return {
			isAdmin,
			updateBoard: false,
			addMember: false,
			lists: false,
			createTask: false,
			taskOrder: false,
			taskMembers: false,
			closeTask: false,
			archiveTask: false,
			deleteTask: false,
		};
	}

	return {
		isAdmin,
		...board.settings,
	};
};
