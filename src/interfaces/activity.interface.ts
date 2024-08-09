import { Base, Member } from './root.interface';

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

export interface Activity extends Base {
	board: string;
	task?: string;
	author: Member;
	action: ActivityAction;
	entityId: string;
	entityType: EntityType;
	from?: string;
	to?: string;
	completed?: boolean;
}
