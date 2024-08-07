import { IMember } from '@/interfaces/root.interface';
import { IWorkspace } from '@/interfaces/workspace.interface';

type GetAllUsers = {
	users: IMember[];
	membersIds: string[];
};

export const getAllUsers = (workspace: IWorkspace): GetAllUsers => {
	const workspaceMembers = workspace.members;

	const allBoardsMembers = workspace.boards.flatMap(board => board.members);

	const allMembers = [...workspaceMembers, ...allBoardsMembers];

	const uniqueMemberIds = Array.from(new Set(allMembers.map(member => member._id)));

	const uniqueMembers = uniqueMemberIds.map(id => {
		return allMembers.find(member => member._id === id);
	});

	const filteredUniqueMembers = uniqueMembers.filter(
		(member): member is IMember => member !== undefined,
	);

	const workspaceMembersIds = workspaceMembers.map(member => member._id);

	return { users: filteredUniqueMembers, membersIds: workspaceMembersIds };
};
