import { create } from 'zustand';

type TaskModalStore = {
	taskId?: string;
	isOpen: boolean;
	onOpen: (taskId: string) => void;
	onClose: () => void;
};

export const useTaskModal = create<TaskModalStore>(set => ({
	taskId: undefined,
	isOpen: false,
	onOpen: taskId => set({ isOpen: true, taskId }),
	onClose: () => set({ isOpen: false, taskId: undefined }),
}));
