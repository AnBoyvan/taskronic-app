import { ColorVariant } from '@/constants/color-variants.constants';

export interface Base {
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export type Member = {
	_id: string;
	name: string;
	email: string;
	avatarName: string;
	avatarColor: ColorVariant;
};

export type MemberDto = {
	_id: string;
	name: string;
};

// export interface TableColumn {
// 	key: string;
// 	label: TranslationKeys;
// }

// export interface Params {
// 	inviteId: string;
// 	workspaceId: string;
// 	boardId: string;
// }
