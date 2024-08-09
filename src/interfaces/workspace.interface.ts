import { IconName } from '@/components/ui/Icon';
import { Locale } from '@/configs/i18n.config';
import { ColorVariant } from '@/styles/colorVariants';

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
	avatarIcon: IconName;
	admins: string[];
	settings: WorkspaceSettings;
}

export interface Workspace extends WorkspaceBase {
	members: Member[];
	boards: BoardWorkspaceField[];
}

export interface WorkspaceField extends WorkspaceBase {
	members: string[];
	boards: string[];
}

export interface WorkspaceCompose {
	name: string;
	description?: string;
	avatarIcon: string;
	avatarColor: ColorVariant;
}

export interface Invite {
	email: string;
	workspaceId: string;
	workspaceName: string;
	authorId: string;
	authorName: string;
	addToContacts: boolean;
	invitation?: string;
}

export interface WorkspaceInvite {
	email: string;
	invitation?: string;
	lang: Locale;
	addToContacts: boolean;
}

export interface WorkspacePermissions extends WorkspaceSettings {
	isAdmin: boolean;
}
