import { IBase, IMember } from './root.interface';

export interface ICommentBase extends IBase {
	content: string;
	author: IMember;
	board: string;
}

export interface IComment extends ICommentBase {
	task: {
		_id: string;
		title: string;
	};
}

export interface ICommentField extends ICommentBase {
	task: string;
}

export interface ICommentCreate {
	content: string;
	board: string;
	task: string;
}

export interface ICommentUpdate {
	content: string;
}
