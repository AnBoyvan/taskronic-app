import { BoardColor } from '@/constants/board-colors.constants';

import { Base, Member } from './root.interface';
import { Task, TaskBasic } from './tasks.interface';
import { WorkspaceBasic } from './workspace.interface';

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
	workspace?: WorkspaceBasic;
	admins: string[];
	settings: BoardSettings;
	lists: List[];
	starred: string[];
	closed: boolean;
	private: boolean;
	members: Member[];
}

export interface Board extends BoardBase {
	tasks: Task[];
}

export interface BoardBasic extends BoardBase {
	tasks: TaskBasic[];
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
