import { Member } from '@/interfaces/root.interface';
import { Workspace } from '@/interfaces/workspace.interface';

type GetAllUsers = {
	(workspace: Workspace): { users: Member[]; membersIds: string[] };
};

export const getAllUsers: GetAllUsers = (workspace: Workspace) => {
	const workspaceMembers = workspace.members;

	const allBoardsMembers = workspace.boards.flatMap(board => board.members);

	const allMembers = [...workspaceMembers, ...allBoardsMembers];

	const uniqueMemberIds = Array.from(new Set(allMembers.map(member => member._id)));

	const uniqueMembers = uniqueMemberIds.map(id => {
		return allMembers.find(member => member._id === id);
	});

	const filteredUniqueMembers = uniqueMembers.filter(
		(member): member is Member => member !== undefined,
	);

	const workspaceMembersIds = workspaceMembers.map(member => member._id);

	return { users: filteredUniqueMembers, membersIds: workspaceMembersIds };
};
