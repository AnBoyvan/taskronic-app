import { IBase } from './root.interface';

export enum NotePriority {
	NO = 1,
	LOW = 2,
	MEDIUM = 3,
	HIGH = 4,
	CRITICAL = 5,
}

export interface IToDo {
	_id: string;
	label: string;
	completed: boolean;
}

export interface INote extends IBase {
	owner: string;
	title: string;
	content: string;
	todos: IToDo[];
	group?: string;
	priority: NotePriority;
	dueDate?: Date;
	closed: boolean;
	archived: boolean;
}

export interface INoteCreate {
	title: string;
	content?: string;
	todos?: IToDo[];
	group?: string;
	priority: NotePriority;
	dueDate?: Date;
}

export interface INoteUpdate extends INoteCreate {
	closed?: boolean;
	archived?: boolean;
}
