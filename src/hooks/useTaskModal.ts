import { create } from 'zustand';

import { Board, BoardTaskField } from '@/types/board.interface';
import { Task, TaskBoardField } from '@/types/tasks.interface';

type TaskModalStore = {
	isOpen: boolean;
	task: Task | TaskBoardField;
	board: Board | BoardTaskField;
	onOpen: () => void;
	onClose: () => void;
};

export const useTaskModal = create<TaskModalStore>(set => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));
