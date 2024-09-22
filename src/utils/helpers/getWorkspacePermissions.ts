import { Workspace, WorkspacePermissions } from '@/types/workspace.interface';

type GetWorkspacePermissions = {
	(workspace: Workspace, userId?: string): WorkspacePermissions;
};

export const getWorkspacePermissions: GetWorkspacePermissions = (workspace, userId) => {
	const isAdmin = Boolean(userId && workspace.admins.includes(userId));
	const isMember = workspace.members.some(({ _id }) => _id === userId);

	if (!isMember) {
		return {
			isAdmin: false,
			invite: false,
			removeMember: false,
			update: false,
			createBoard: false,
		};
	}

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
