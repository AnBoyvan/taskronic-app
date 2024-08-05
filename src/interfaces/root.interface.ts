import { ColorVariant } from '@/styles/colorVariants';

export interface IBase {
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface IMember {
	_id: string;
	name: string;
	email: string;
	avatarName: string;
	avatarColor: ColorVariant;
}

export interface IMemberDto {
	_id: string;
	name: string;
}

export interface ITableColumn {
	key: string;
	label: TranslationKeys;
}

// export interface Params {
// 	inviteId: string;
// 	workspaceId: string;
// 	boardId: string;
// }
