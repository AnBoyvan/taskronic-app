import { ColorVariant } from '@/styles/colorVariants';

export interface Base {
	_id: string;
	createdAt: string;
	updatedAt: string;
}

export interface Member {
	_id: string;
	name: string;
	email: string;
	avatarName: string;
	avatarColor: ColorVariant;
}

export interface MemberDto {
	_id: string;
	name: string;
}

export interface TableColumn {
	key: string;
	label: TranslationKeys;
}

// export interface Params {
// 	inviteId: string;
// 	workspaceId: string;
// 	boardId: string;
// }
