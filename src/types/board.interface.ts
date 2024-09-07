import { BoardColor } from '@/constants/board-colors.constants';

import { Base, Member } from './root.interface';
import { TaskBoardField, TaskWorkspaceField } from './tasks.interface';

export interface BoardSettings {
	updateBoard: boolean;
	addMember: boolean;
	lists: boolean;
	createTask: boolean;
	taskOrder: boolean;
	taskMembers: boolean;
	closeTask: boolean;
	archiveTask: boolean;
	deleteTask: boolean;
}

export interface CreateListDto {
	label: string;
	bgColor: string;
	textColor: string;
}

export interface List extends CreateListDto {
	_id: string;
	order: number;
	archived: boolean;
}

export interface BoardBase extends Base {
	title: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	textColor?: string;
	bgColor?: BoardColor;
	workspace?: string;
	admins: string[];
	settings: BoardSettings;
	lists: List[];
	starred: string[];
	closed: boolean;
	private: boolean;
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
	tasks: TaskBoardField[];
}

export type BoardCompose = {
	title?: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	bgColor?: BoardColor | '';
	textColor?: string;
	private?: boolean;
};

export type BoardOpen = {
	workspaceId: string;
};

export interface BoardPermissions extends BoardSettings {
	isAdmin: boolean;
}
