import { ColorVariant } from '@/constants/color-variants.constants';

import { BoardBasic } from './board.interface';
import { Member } from './root.interface';
import { Workspace } from './workspace.interface';

export interface IUser {
	_id: string;
	name: string;
	email: string;
	initials: string;
	avatar: ColorVariant;
	bio: string;
	contacts: Member[];
	workspaces: Workspace[];
	starred: BoardBasic[];
}

export type UserUpd = {
	name?: string;
	avatar?: ColorVariant;
	bio?: string;
};
