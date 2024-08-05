import { IconName } from '@/components/ui/Icon';
import { Locale } from '@/configs/i18n.config';
import { ColorVariant } from '@/styles/colorVariants';

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
	avatarColor: ColorVariant;
	avatarIcon: IconName;
	admins: string[];
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
	avatarColor: ColorVariant;
}

export interface IInvite {
	email: string;
	workspaceId: string;
	workspaceName: string;
	authorId: string;
	authorName: string;
	addToContacts: boolean;
	invitation?: string;
}

export interface IWorkspaceInvite {
	email: string;
	invitation?: string;
	lang: Locale;
	addToContacts: boolean;
}
