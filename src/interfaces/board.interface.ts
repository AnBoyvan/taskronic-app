import { IBase, IMember } from './root.interface';
import { ITaskBoardField, ITaskWorkspaceField } from './tasks.interface';

export interface IBoardSettings {
	addMember: boolean;
	updateBoard: boolean;
	createTask: boolean;
	closeTask: boolean;
	archiveTask: boolean;
}

export interface IList {
	_id: string;
	label: string;
	bgColor: string;
	textColor: string;
	order: number;
	archived: boolean;
}

export interface IBoardBase extends IBase {
	title: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	bgColor: string;
	workspace?: string;
	admins: string[];
	settings: IBoardSettings;
	lists: IList[];
	closed: boolean;
}

export interface IBoard extends IBoardBase {
	members: IMember[];
	tasks: ITaskBoardField[];
}

export interface IBoardWorkspaceField extends IBoardBase {
	members: IMember[];
	tasks: ITaskWorkspaceField[];
}

export interface IBoardTaskField extends IBoardBase {
	members: string[];
	tasks: string[];
}

export interface IBoardCompose {
	title: string;
	description?: string;
	thumbImage?: string;
	bgImage?: string;
	bgColor?: string;
	private: boolean;
}

export interface IBoardOpen {
	workspaceId: string;
}
