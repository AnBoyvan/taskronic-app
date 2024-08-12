import { BoardColor } from '@/constants/board-colors.constants';

import { Base, Member } from './root.interface';
import { TaskBoardField, TaskWorkspaceField } from './tasks.interface';

export interface BoardSettings {
	addMember: boolean;
	updateBoard: boolean;
	createTask: boolean;
	closeTask: boolean;
	archiveTask: boolean;
}

export type List = {
	_id: string;
	label: string;
	bgColor: string;
	textColor: string;
	order: number;
	archived: boolean;
};

export interface BoardBase extends Base {
	title: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	bgColor: BoardColor;
	workspace?: string;
	admins: string[];
	settings: BoardSettings;
	lists: List[];
	starred: string[];
	closed: boolean;
}

export interface Board extends BoardBase {
	members: Member[];
	tasks: TaskBoardField[];
}

export interface BoardWorkspaceField extends BoardBase {
	members: Member[];
	tasks: TaskWorkspaceField[];
}

export interface BoardTaskField extends BoardBase {
	members: string[];
	tasks: string[];
}

export type BoardCompose = {
	title: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	bgColor?: BoardColor;
	private: boolean;
};

export type BoardOpen = {
	workspaceId: string;
};
