import { BoardColor } from '@/constants/board-colors.constants';
import { ColorVariant } from '@/constants/color-variants.constants';
import { WorkspaceIcon } from '@/constants/workspace-icons.constants';

import { BoardPermissions, BoardSettings, List } from './board.interface';
import { CommentField } from './comment.interface';
import { Member } from './root.interface';
import { Subtask, TaskPriority } from './tasks.interface';
import { WorkspacePermissions, WorkspaceSettings } from './workspace.interface';

interface Workspace {
	_id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	description: string;
	avatarColor: ColorVariant;
	avatarIcon: WorkspaceIcon;
	admins: string[];
	settings: WorkspaceSettings;
	members: Member[];
	requests: Member[];
	permissions: WorkspacePermissions;
	boards: {
		_id: string;
		createdAt: string;
		updatedAt: string;
		title: string;
		description?: string;
		thumbImage?: string;
		bgImage?: string;
		textColor?: string;
		bgColor?: BoardColor;
		workspace?: string;
		admins: string[];
		settings: BoardSettings;
		lists: string[];
		starred: string[];
		closed: boolean;
		private: boolean;
		members: Member[];
		permissions: BoardPermissions;
		tasks: string[];
	}[];
}

interface Board {
	_id: string;
	createdAt: string;
	updatedAt: string;
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
	permissions: BoardPermissions;
	members: Member[];
	tasks: {
		_id: string;
		createdAt: string;
		updatedAt: string;
		title: string;
		description?: string;
		priority: TaskPriority;
		subtasks: Subtask[];
		list: string;
		dueDate?: Date;
		order: number;
		completed: boolean;
		archived: boolean;
		members: Member[];
		workspace?: string;
		comments?: CommentField[];
		board: {
			_id: string;
			createdAt: string;
			updatedAt: string;
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
			members: Member[];
			permissions: BoardPermissions;
			tasks: string[];
		};
	}[];
}

interface Task {
	_id: string;
	createdAt: string;
	updatedAt: string;
	title: string;
	description?: string;
	priority: TaskPriority;
	subtasks: Subtask[];
	list: string;
	dueDate?: Date;
	order: number;
	completed: boolean;
	archived: boolean;
	members: Member[];
	workspace?: {
		_id: string;
		name: string;
		description: string;
		avatarColor: ColorVariant;
		avatarIcon: WorkspaceIcon;
	};
	comments: CommentField[];
	board: {
		_id: string;
		createdAt: string;
		updatedAt: string;
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
		members: Member[];
		permissions: BoardPermissions;
		tasks: string[];
	};
}
