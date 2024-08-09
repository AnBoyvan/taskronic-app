import { Workspace, WorkspacePermissions } from '@/interfaces/workspace.interface';

type GetWorkspacePermissions = {
	(workspace: Workspace, userId: string): WorkspacePermissions;
};

export const getWorkspacePermissions: GetWorkspacePermissions = (workspace, userId) => {
	const isAdmin = workspace.admins.includes(userId);

	if (isAdmin) {
		return {
			isAdmin: true,
			invite: true,
			removeMember: true,
			update: true,
			createBoard: true,
		};
	}

	const { invite, removeMember, update, createBoard } = workspace.settings;

	return {
		isAdmin,
		invite,
		removeMember,
		update,
		createBoard,
	};
};
