import { IBoardTaskField } from './board.interface';
import { ICommentField } from './comment.interface';
import { IBase, IMember } from './root.interface';
import { IWorkspaceField } from './workspace.interface';

export enum TaskPriority {
	NO = 1,
	LOW = 2,
	MEDIUM = 3,
	HIGH = 4,
	CRITICAL = 5,
}

export interface ISubtask {
	_id: string;
	label: string;
	completed: boolean;
}

export interface ITaskBase extends IBase {
	title: string;
	description?: string;
	priority: TaskPriority;
	subtasks: ISubtask[];
	list: string;
	dueDate?: Date;
	order: number;
	completed: boolean;
	archived: boolean;
}

export interface ITask extends ITaskBase {
	members?: IMember[];
	workspace: IWorkspaceField;
	board: IBoardTaskField;
	comments?: ICommentField[];
}

export interface ITaskWorkspaceField extends ITaskBase {
	members?: string[];
	workspace: string;
	board: string;
	comments?: string[];
}

export interface ITaskBoardField extends ITaskBase {
	members?: IMember[];
	workspace: string;
	board: string;
	comments?: ICommentField[];
}

export interface ITaskCreate {
	title: string;
	description?: string;
	priority: TaskPriority;
	subtasks: ISubtask[];
	list: string;
	dueDate?: Date;
	order: number;
	members: string[];
}

export interface ITaskUpdGeneral {
	title: string;
	description?: string;
	priority: TaskPriority;
	order: number;
}

export interface ITaskUpdOrder {
	taskId: string;
	order: number;
	list: string;
}
