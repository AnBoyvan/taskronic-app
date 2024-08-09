import { Base } from './root.interface';

export enum NotePriority {
	NO = 1,
	LOW = 2,
	MEDIUM = 3,
	HIGH = 4,
	CRITICAL = 5,
}

export interface ToDo {
	_id: string;
	label: string;
	completed: boolean;
}

export interface Note extends Base {
	owner: string;
	title: string;
	content: string;
	todos: ToDo[];
	group?: string;
	priority: NotePriority;
	dueDate?: Date;
	closed: boolean;
	archived: boolean;
}

export interface NoteCreate {
	title: string;
	content?: string;
	todos?: ToDo[];
	group?: string;
	priority: NotePriority;
	dueDate?: Date;
}

export interface NoteUpdate extends NoteCreate {
	closed?: boolean;
	archived?: boolean;
}
