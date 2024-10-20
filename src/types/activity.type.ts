import { ColorVariant } from '@/constants/color-variants.constants';

import { List } from './board.interface';
import { Base, Member } from './root.interface';
import { Subtask } from './tasks.interface';

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
	board: {
		_id: string;
		workspace: string;
		title: string;
		lists: List[];
	};
	task?: {
		_id: string;
		title: string;
		list: string;
		subtasks: Subtask[];
	};
	user: {
		_id: string;
		name?: string;
		email?: string;
		initials?: string;
		avatar?: ColorVariant;
	};
	author: Member;
	action: ActivityAction;
	entityId: string;
	entityTitle: string;
	entityType: EntityType;
	from?: string;
	to?: string;
	completed?: boolean;
}
