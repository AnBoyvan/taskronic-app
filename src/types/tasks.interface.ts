import { BoardBasic } from './board.interface';
import { Comment } from './comment.interface';
import { Base, Member, Priority } from './root.interface';
import { WorkspaceBasic } from './workspace.interface';

export type CreateSubtask = {
	label: string;
};

export type Subtask = {
	_id: string;
	label: string;
	completed: boolean;
};

export interface TaskBase extends Base {
	title: string;
	description?: string;
	priority: Priority;
	subtasks: Subtask[];
	list: string;
	dueDate: string | null;
	order: number;
	completed: boolean;
	archived: boolean;
}

export interface Task extends TaskBase {
	members: Member[];
	workspace: WorkspaceBasic;
	board: BoardBasic;
	comments: Comment[];
}

export interface TaskBasic extends TaskBase {
	members: string[];
	workspace: string;
	board: string;
	comments: string[];
}

export type TaskCreate = {
	title: string;
	list: string;
};

export type TaskUpdGeneral = {
	title?: string;
	description?: string;
	priority?: Priority;
	dueDate?: string;
};

export type TaskUpdOrder = {
	taskId: string;
	order: number;
	list: string;
};
