import { Base, Priority } from './root.interface';

export type ToDo = {
	_id: string;
	label: string;
	completed: boolean;
};

export interface Note extends Base {
	owner: string;
	title: string;
	content: string;
	todos: ToDo[];
	group?: string;
	priority: Priority;
	dueDate: string | null;
	closed: boolean;
	archived: boolean;
}

export interface NoteCreate {
	title: string;
	content?: string;
	todos?: ToDo[];
	group?: string;
	priority: Priority;
	dueDate?: string;
}

export interface NoteUpdate extends NoteCreate {
	closed?: boolean;
	archived?: boolean;
}
