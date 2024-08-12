import { Board, BoardWorkspaceField } from '@/types/board.interface';

interface IsBoardMember {
	(board: BoardWorkspaceField | Board, userId: string): boolean;
}

export const isBoardMember: IsBoardMember = (board, userId) => {
	const boardMembersIds = board.members.map(member => member._id);

	const isMember = boardMembersIds.includes(userId);

	return isMember;
};
