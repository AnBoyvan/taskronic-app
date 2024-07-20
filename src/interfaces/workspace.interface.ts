import { IBoardWorkspaceField } from './board.interface';
import { IBase, IMember } from './root.interface';

export interface IWorkspaceSettings {
	invite: boolean;
	removeMember: boolean;
	update: boolean;
	createBoard: boolean;
}

export interface IWorkspaceBase extends IBase {
	name: string;
	description: string;
	avatarColor: string;
	avatarIcon: string;
	admins: [];
	settings: IWorkspaceSettings;
}

export interface IWorkspace extends IWorkspaceBase {
	members: IMember[];
	boards: IBoardWorkspaceField[];
}

export interface IWorkspaceField extends IWorkspaceBase {
	members: string[];
	boards: string[];
}

export interface IWorkspaceCompose {
	name: string;
	description?: string;
	avatarIcon: string;
	avatarColor: string;
}

export interface IWorkspaceInvite {
	email: string;
	addToContacts: boolean;
}
