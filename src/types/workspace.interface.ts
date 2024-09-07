import { Locale } from '@/configs/i18n.config';
import { ColorVariant } from '@/constants/color-variants.constants';
import { WorkspaceIcon } from '@/constants/workspace-icons.constants';

import { BoardWorkspaceField } from './board.interface';
import { Base, Member } from './root.interface';

export interface WorkspaceSettings {
	invite: boolean;
	removeMember: boolean;
	update: boolean;
	createBoard: boolean;
}

export interface WorkspaceBase extends Base {
	name: string;
	description: string;
	avatarColor: ColorVariant;
	avatarIcon: WorkspaceIcon;
	admins: string[];
	settings: WorkspaceSettings;
}

export interface Workspace extends WorkspaceBase {
	members: Member[];
	boards: BoardWorkspaceField[];
	requests: Member[];
}

export interface WorkspaceField extends WorkspaceBase {
	members: string[];
	boards: string[];
	requests: string[];
}

export type WorkspaceCompose = {
	name: string;
	description?: string;
	avatarIcon: WorkspaceIcon;
	avatarColor: ColorVariant;
};

export interface Invite extends Base {
	email: string;
	workspaceId: string;
	workspaceName: string;
	authorId: string;
	authorName: string;
	invitation?: string;
}

export type WorkspaceInvite = {
	email: string;
	invitation?: string;
	lang: Locale;
	link?: string;
};

export interface WorkspacePermissions extends WorkspaceSettings {
	isAdmin: boolean;
}