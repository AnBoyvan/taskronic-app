import { IBase, IMember } from './root.interface';

export enum ActivityAction {
	ADD = 'added',
	RENAME = 'renamed',
	BACKGROUND = 'background',
	ADMIN = 'admin',
	MOVE = 'moved',
	MARK = 'marked',
	CLOSE = 'closed',
	ARCHIVE = 'archived',
	REMOVE = 'removed',
	DATE = 'date',
	PRIORITY = 'priority',
}

export enum EntityType {
	BOARD = 'board',
	LIST = 'list',
	TASK = 'task',
	SUBTASK = 'subtask',
	USER = 'user',
}

export interface IActivity extends IBase {
	board: string;
	task?: string;
	author: IMember;
	action: ActivityAction;
	entityId: string;
	entityType: EntityType;
	from?: string;
	to?: string;
	completed?: boolean;
}
