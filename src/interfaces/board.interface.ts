import { Base, Member } from './root.interface';
import { TaskBoardField, TaskWorkspaceField } from './tasks.interface';

export interface BoardSettings {
	addMember: boolean;
	updateBoard: boolean;
	createTask: boolean;
	closeTask: boolean;
	archiveTask: boolean;
}

export interface List {
	_id: string;
	label: string;
	bgColor: string;
	textColor: string;
	order: number;
	archived: boolean;
}

export interface BoardBase extends Base {
	title: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	bgColor: string;
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

export interface BoardCompose {
	title: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	bgColor?: string;
	private: boolean;
}

export interface BoardOpen {
	workspaceId: string;
}

// interface Board {
// 	_id: string;
// 	createdAt: string;
// 	updatedAt: string;
// 	title: string;
// 	description?: string;
// 	thumbImage?: string;
// 	bgImage?: string;
// 	bgColor: string;
// 	workspace?: string;
// 	admins: string[];
// 	settings: BoardSettings;
// 	lists: List[];
// 	starred: string[];
// 	closed: boolean;
// 	members: Member[];
// 	tasks: ITaskWorkspaceField[];
// }
