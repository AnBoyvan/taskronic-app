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
}

export interface CommentField extends CommentBase {
	task: string;
}

export type CommentCreate = {
	content: string;
	board: string;
	task: string;
};

export type CommentUpdate = Pick<CommentCreate, 'content'>;
