import { IBoard, IBoardWorkspaceField } from '@/interfaces/board.interface';

interface IsBoardMember {
	(board: IBoardWorkspaceField | IBoard, userId: string): boolean;
}

export const isBoardMember: IsBoardMember = (board, userId) => {
	const boardMembersIds = board.members.map(member => member._id);

	const isMember = boardMembersIds.includes(userId);

	return isMember;
};
