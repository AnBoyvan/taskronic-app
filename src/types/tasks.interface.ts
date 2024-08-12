import { BoardTaskField } from './board.interface';
import { CommentField } from './comment.interface';
import { Base, Member } from './root.interface';
import { WorkspaceField } from './workspace.interface';

export enum TaskPriority {
	NO = 1,
	LOW = 2,
	MEDIUM = 3,
	HIGH = 4,
	CRITICAL = 5,
}

export type Subtask = {
	_id: string;
	label: string;
	completed: boolean;
};

export interface TaskBase extends Base {
	title: string;
	description?: string;
	priority: TaskPriority;
	subtasks: Subtask[];
	list: string;
	dueDate?: Date;
	order: number;
	completed: boolean;
	archived: boolean;
}

export interface Task extends TaskBase {
	members?: Member[];
	workspace: WorkspaceField;
	board: BoardTaskField;
	comments?: CommentField[];
}

export interface TaskWorkspaceField extends TaskBase {
	members?: string[];
	workspace: string;
	board: string;
	comments?: string[];
}

export interface TaskBoardField extends TaskBase {
	members?: Member[];
	workspace: string;
	board: string;
	comments?: CommentField[];
}

export type TaskCreate = {
	title: string;
	description?: string;
	priority: TaskPriority;
	subtasks: Subtask[];
	list: string;
	dueDate?: Date;
	order: number;
	members: string[];
};

export type TaskUpdGeneral = {
	title: string;
	description?: string;
	priority: TaskPriority;
	order: number;
};

export type TaskUpdOrder = {
	taskId: string;
	order: number;
	list: string;
};
