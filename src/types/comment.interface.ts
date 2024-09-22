import { ColorVariant } from '@/constants/color-variants.constants';

import { Base, Member } from './root.interface';

export interface CommentBase extends Base {
	content: string;
	author: Member;
	board: string;
}

export interface Comment extends CommentBase {
	task: {
		_id: string;
		title: string;
	};
	user: {
		_id: string;
		name?: string;
		email?: string;
		avatarName?: string;
		avatarColor?: ColorVariant;
	};
}

export type CommentCreate = {
	content: string;
	board: string;
	task: string;
};

export type CommentUpdate = Pick<CommentCreate, 'content'>;
