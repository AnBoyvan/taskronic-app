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
	initials: string;
	avatar: ColorVariant;
};

export type MemberDto = {
	_id: string;
	name: string;
};

export enum Priority {
	NO = 1,
	LOW = 2,
	MEDIUM = 3,
	HIGH = 4,
	CRITICAL = 5,
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
